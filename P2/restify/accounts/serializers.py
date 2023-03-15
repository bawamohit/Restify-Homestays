from rest_framework.serializers import ModelSerializer, CharField, EmailField
from .models import User
from properties.models import Comment, Reservation, Property
from django.core.exceptions import ValidationError

class UserSerializer(ModelSerializer):
    first_name = CharField(max_length = 20)
    last_name = CharField(max_length = 20)
    email = EmailField()

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password', 'phoneNumber', 'avatars',]

    def create(self, validated_data):
        print(self.context['request'].user)
        return super().create(validated_data)

class CommentSerializer(ModelSerializer):

    class Meta:
        model = Comment
        fields = ['user','body', 'rating', "content_type", "replyingTo"]
    

    def validate(self, clean_data):
        
        """
        if clean_data['body'] == "test":
            raise ValidationError({"body":"error raised"})
        """

        
        """
        # check if user reserved property (and they are not the host) before they can comment
        if clean_data['content_type'].name == 'property': # property comment
            raise ValidationError({"content_type":"error raised"})
            propertyID = self.context.get('view').kwargs.get('pk') # property being commented on
            aProperty = Property.objects.get(pk=propertyID)
            userReservations = Reservation.objects.filter(requester=clean_data['user'], property = aProperty)

            if userReservations == None and clean_data['user'] != aProperty.owner:
                print ("raise error")

            # if the user is the host, they can only reply to user comments that havent been commented on yet


            # if the user is not the host, they can only make new comments or reply to the host replies that havent been replied to yet
        """
        
        
        
        
        
        
        return clean_data

    def create(self, validated_data):
        # print(self.context['request'].user)

        """
        
        
        # check if user reserved one of the host locations so host can comment
        if validated_data['content_type'].name == 'user': # user comment
            hostProperties = Property.objects.filter(owner=validated_data['user'])
            userID = self.context.get('view').kwargs.get('pk') # user being commented on
            userCommentedOn = User.objects.get(id=userID)

            error = True
            for indivHostProperty in hostProperties:
                userReservations = Reservation.objects.filter(requester=userCommentedOn, property = indivHostProperty) # i dont think this works properly
                if userReservations != None:
                    error = False
            
            if error:
                print ("error")

            # cannot allow users to comment on themselves
        


        # check if user reserved property (and they are not the host) before they can comment
        if validated_data['content_type'].name == 'property': # property comment
            propertyID = self.context.get('view').kwargs.get('pk') # property being commented on
            aProperty = Property.objects.get(pk=propertyID)
            userReservations = Reservation.objects.filter(requester=validated_data['user'], property = aProperty)

            if userReservations == None and validated_data['user'] != aProperty.owner:
                print ("raise error")

            # if the user is the host, they can only reply to user comments that havent been commented on yet


            # if the user is not the host, they can only make new comments or reply to the host replies that havent been replied to yet


        """


        last_comment = Comment.objects.all().last()
        if (last_comment != None):
            validated_data['commentID'] = last_comment.__getattribute__('commentID') + 1
        else:
            validated_data['commentID'] = 1


        return super().create(validated_data)
    
