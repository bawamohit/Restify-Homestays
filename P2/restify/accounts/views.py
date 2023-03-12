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

# Create your views here.
class UserCreate(CreateAPIView):
    serializer_class = UserSerializer

class UserGetSet(RetrieveAPIView, UpdateAPIView):
    serializer_class = UserSerializer
    def get_object(self):
        return get_object_or_404(User, id=self.kwargs['pk'])

class CommentCreate(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer

class CommentGetSet(RetrieveAPIView, UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CommentSerializer
    def get_object(self):
        return get_object_or_404(User, id=self.kwargs['pk'])