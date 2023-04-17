from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView, \
    ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, CommentSerializer, UserViewSerializer
from .models import User
from properties.models import Comment, Property
from django.http import JsonResponse
from django.contrib.contenttypes.models import ContentType
from rest_framework.pagination import PageNumberPagination

# Create your views here.
class UserCreate(CreateAPIView):
    permission_classes = []
    serializer_class = UserSerializer

class UserGetSet(RetrieveAPIView, UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return get_object_or_404(User, id=self.request.user.id)
    
class UserLogged(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return get_object_or_404(User, id=self.request.user.id)
    
class UserView(RetrieveAPIView):
    permission_classes = []
    serializer_class = UserViewSerializer

    def get_object(self):
        return get_object_or_404(User, id=self.kwargs['pk'])


class UserList(ListAPIView):
    permission_classes = []
    serializer_class = UserSerializer

    def get_queryset(self):
        if self.request.method == 'GET':
            queryset = User.objects.all()
            return queryset


class CommentCreateUser(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"content_type": ContentType.objects.get_for_model(User)})
        context.update({"user": self.request.user})
        return context

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, object_id=self.kwargs['pk'], content_type=ContentType.objects.get_for_model(User))

class CommentCreateProperty(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"content_type": ContentType.objects.get_for_model(Property)})
        context.update({"user": self.request.user})
        return context

    def perform_create(self, serializer):
        serializer.save(user=self.request.user, object_id=self.kwargs['pk'], endOfCommentChain=True, content_type=ContentType.objects.get_for_model(Property))
        instance = serializer.save()
        
        # set the new end of comment chain
        if (instance.replyingTo != None):
            comm = Comment.objects.get(commentID=instance.replyingTo)
            comm.endOfCommentChain = False
            comm.save()
    
class CommentListUser(ListAPIView):
    pagination_class = PageNumberPagination

    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer
    def get_queryset(self):
        return Comment.objects.filter(object_id=self.kwargs['pk'], content_type=ContentType.objects.get_for_model(User))

class CommentListProperty (APIView):

    permission_classes = [IsAuthenticated]
    
    def get (self, request, pk):
        prop = Property.objects.get(id=self.kwargs['pk'])        
        propEnds = prop.reviews.filter(endOfCommentChain=True)
        # print(propEnds.all())

        big_array = []
        for i in propEnds:
            temp_array = [i]
            if (i.replyingTo != None):
                currentComment = Comment.objects.get(commentID=i.commentID)

                while (currentComment.replyingTo != None):
                    currentComment = Comment.objects.get(commentID=currentComment.replyingTo)
                    temp_array.append(currentComment)
            
            temp_array = temp_array[::-1]
            serializer = CommentSerializer(temp_array, many=True)
            big_array.append(serializer.data)

        # print(big_array)

        page_num = self.request.GET.get('page', None)

        print("pagenum is: ", page_num)
        print("bigarray is: ", len(big_array))

        if page_num is not None:
            page_num = int(page_num) - 1
            if page_num < len(big_array):
                return JsonResponse(big_array[page_num:page_num + 1], safe=False)

        if len(big_array) >= 1:
            return JsonResponse(big_array[0:1], safe=False)
        
        return JsonResponse([], safe=False)