from rest_framework.serializers import ModelSerializer, CharField
from ..models import Property

class PropertySerializer(ModelSerializer):   
    class Meta:
        model = Property
        exclude = []
        read_only_fields = ['owner']