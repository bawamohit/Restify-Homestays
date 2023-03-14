from rest_framework.serializers import ModelSerializer, CharField
from ..models import Notification
from rest_framework import serializers

class NotificationSerializer(ModelSerializer):  
    
    class Meta:
        model = Notification
        fields = '__all__'
