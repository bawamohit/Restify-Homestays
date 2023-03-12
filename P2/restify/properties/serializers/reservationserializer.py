from rest_framework.serializers import ModelSerializer, CharField
from ..models import Reservation
from rest_framework import serializers

class ReservationSerializer(ModelSerializer):   
    status = serializers.IntegerField(default=1, read_only=True)
    class Meta:
        model = Reservation
        fields = '__all__'

