from rest_framework.serializers import ModelSerializer, CharField
from ..models import Reservation
from rest_framework import serializers

class ReservationSerializer(ModelSerializer):   
    status = serializers.CharField(read_only=True)
    
        
    class Meta:
        model = Reservation
        fields = '__all__'

