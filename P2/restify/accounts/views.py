from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView, \
    ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, CommentSerializer
from .models import User
from properties.models import Comment, Property
from django.http import JsonResponse

# Create your views here.
class UserCreate(CreateAPIView):
    serializer_class = UserSerializer

class UserGetSet(RetrieveAPIView, UpdateAPIView):
    serializer_class = UserSerializer
    def get_object(self):
        return get_object_or_404(User, id=self.kwargs['pk'])

class CommentCreateUser(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, userCommentedOnID=self.kwargs['pk'], object_id=self.kwargs['pk'])

class CommentCreateProperty(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, object_id=self.kwargs['pk'], propertyID=self.kwargs['pk'], endOfCommentChain=True)
        instance = serializer.save()
        
        # set the new end of comment chain
        if (instance.replyingTo != None):
            comm = Comment.objects.get(commentID=instance.replyingTo)
            comm.endOfCommentChain = False
            comm.save()


# don't think we even need a way to update comment
"""
class CommentGetSet(RetrieveAPIView, UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer
    def get_object(self):
        return get_object_or_404(Comment, id=self.kwargs['pk'])
"""

    
class CommentListUser(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer
    def get_queryset(self):
        return Comment.objects.filter(userCommentedOnID=self.kwargs['pk'], content_type = 6) # content type = 6 is user comment
    
class CommentListProperty(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer
    def get_queryset(self):
        prop = Property.objects.get(id=self.kwargs['pk'])
        propEnds = prop.reviews.filter(endOfCommentChain=True)

        big_array = []
        # big_qs = Comment.objects.none()
        for i in propEnds:
            temp_array = [i]
            # big_qs = big_qs | i

            if (i.replyingTo != None):

                currentComment = Comment.objects.get(commentID=i.commentID)
                while (currentComment.replyingTo != None):
                    currentComment = Comment.objects.get(commentID=i.replyingTo)
                    temp_array.append(currentComment)
                    
            big_array.append(temp_array)

        print(big_array)
        return prop.reviews.all()

        # return big_array
        
        # dont use
        # return Comment.objects.filter(user=self.request.user, content_type = 8) # content type = 8 is property comment