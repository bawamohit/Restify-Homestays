from rest_framework.serializers import ModelSerializer, CharField, EmailField
from .models import User
from properties.models import Comment, Reservation, Property
from django.core.exceptions import ValidationError
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.hashers import make_password

class UserSerializer(ModelSerializer):
    first_name = CharField(max_length = 20)
    last_name = CharField(max_length = 20)
    email = EmailField()

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password', 'phoneNumber', 'avatars',]

    def create(self, validated_data):
        # print(self.context['request'].user)
        return super().create(validated_data)
    
    def validate_password(self, value):
        return make_password(value)
    
class UserViewSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'phoneNumber', 'avatars']

class CommentSerializer(ModelSerializer):

    class Meta:
        model = Comment
        fields = ['user','body', 'rating', "content_type", "replyingTo", "first_name", "last_name", "avatars"]
        read_only_fields = ['content_type','user']

    def validate(self, clean_data):

        # VALIDATION ERRORS FOR USER COMMENTS
        # if clean_data['content_type'].name == 'user': # user comment
        if self.context.get('content_type') == ContentType.objects.get_for_model(User):
            
            # the user you are commenting on must has a reservation on your property (YOU ARE THE HOST)
            yourProperties = Property.objects.filter(owner=self.context.get('user'))

            userIDOfCommentedOn = self.context.get('view').kwargs.get('pk')
            theUser = User.objects.get(pk=userIDOfCommentedOn)

            hasReservation = False
            for propertyOwned in yourProperties:
                theReservations = Reservation.objects.filter(requester = theUser, property = propertyOwned)
                if list(theReservations) != []:
                    hasReservation = True
            
            if hasReservation == False:
                raise ValidationError({"You cannot comment on this user because they have not reserved at any of your properties!"})
            
            # cannot reply in user comments
            if clean_data['replyingTo'] != None:
                raise ValidationError({"You cannot reply to reviews of a user!"})
            
            # host must leave a rating for their review
            if clean_data['rating'] == None:
                raise ValidationError({"You must leave a rating!"})

        # VALIDATION ERRORS FOR PROPERTY COMMENTS
        # check if user reserved property (and they are not the host) before they can comment
        # if clean_data['content_type'].name == 'property': # property comment
        if self.context.get('content_type') == ContentType.objects.get_for_model(Property):
            propertyID = self.context.get('view').kwargs.get('pk') # property being commented on
            theProperty = Property.objects.get(pk=propertyID)
            userReservations = Reservation.objects.filter(requester=self.context.get('user'), property = theProperty)

            # cannot comment if user has not reserved this property and they are not the host
            if list(userReservations) == [] and self.context.get('user') != theProperty.owner:
                raise ValidationError({"You never reserved this property and you are not the host!"})
            
            elif list(userReservations) != [] and self.context.get('user') != theProperty.owner: # you have a reservation check if its completed/terminated
                # must be completed or terminated reservation
                completedOrTerminated = False
                for theReservation in list(userReservations):                    
                    if theReservation.status == "Completed" or theReservation.status == "Terminated":
                        completedOrTerminated = True
                    
                if completedOrTerminated == False:
                    raise ValidationError({"Your reservation(s) were never completed or terminated for this property so you cannot leave a review!"})

            # if the user is the host, they can only reply to user comments (i.e. cannot comment on their own property)/they cannot comment on their own reply
            if self.context.get('user') == theProperty.owner:
                if clean_data['replyingTo'] == None:
                    raise ValidationError({"As a host, you cannot make a review on your own property!"})
                
                if Comment.objects.get(commentID=clean_data['replyingTo']).user == theProperty.owner:
                    raise ValidationError({"As a host, you cannot reply to your own replies!"})

            # cannot reply to comment that has already been commented on && reply should not have a rating
            if clean_data['replyingTo'] != None:
                if Comment.objects.get(commentID=clean_data['replyingTo']).endOfCommentChain == False:
                    raise ValidationError({"Someone has already replied to this comment!"})
                
                if clean_data['rating'] != None:
                    raise ValidationError({"Cannot give a rating in a reply!"})

            # if the user is not the host, they can only make new comments (i think covered already) or reply to the host replies that havent been replied to yet (not being replied to is already covered)
            # so has to be a reply to a host reply if not a new comment
                if self.context.get('user') != theProperty.owner:
                    
                    userOfOriginalMessage = Comment.objects.get(commentID=clean_data['replyingTo']).user
                    if userOfOriginalMessage != theProperty.owner:
                        raise ValidationError({"As a user, you cannot reply to other users, you must reply back to the Host!"})
                    
                    # a user can only reply if they started the comment thread
                    prevComment = Comment.objects.get(commentID=clean_data['replyingTo'])
                    while (prevComment.replyingTo != None):
                        prevComment = Comment.objects.get(commentID=prevComment.replyingTo)

                    if prevComment.user != self.context.get('user'):
                        raise ValidationError({"You did not make the original review, so you cannot reply in this comment chain!"})
            
            # you can't make more than 2 reviews on a property
            if clean_data['replyingTo'] == None:
                usersCommentsOnThisProperty = Comment.objects.filter(object_id = propertyID, content_type=ContentType.objects.get_for_model(Property), user=self.context.get('user'))
                if list(usersCommentsOnThisProperty) != []:
                    raise ValidationError({"Cannot make another review on this property, you can only reply to host replies to your original review!"})
        
        return clean_data

    def create(self, validated_data):
        # print(self.context['request'].user)

        last_comment = Comment.objects.all().last()
        if (last_comment != None):
            validated_data['commentID'] = last_comment.__getattribute__('commentID') + 1
        else:
            validated_data['commentID'] = 1

        return super().create(validated_data)
    
