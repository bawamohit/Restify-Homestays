from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView, \
    ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from ..serializers import NotificationSerializer
from ..models import Reservation, Property, Notification

class NotificationList(ListAPIView):
    serializer_class = NotificationSerializer
    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)
    

class RetrieveNotification(RetrieveAPIView, DestroyAPIView):
    serializer_class = NotificationSerializer

    def get_object(self):
        return get_object_or_404(Notification, id=self.kwargs['pk'])
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        
        # Call the destroy() method of the DestroyAPIView
        self.destroy(request, *args, **kwargs)

        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
    
class NotificationDelete(DestroyAPIView):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    lookup_url_kwarg = 'pk'