from rest_framework.serializers import ModelSerializer, CharField, EmailField
from .models import User
from properties.models import Comment

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
        fields = ['body', 'rating', "content_type", "replyingTo"]
    
    def create(self, validated_data):
        print(self.context['request'].user)

        last_comment = Comment.objects.all().last()
        if (last_comment != None):
            validated_data['commentID'] = last_comment.__getattribute__('commentID') + 1
        else:
            validated_data['commentID'] = 1


        return super().create(validated_data)