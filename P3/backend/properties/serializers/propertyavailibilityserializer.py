from rest_framework.serializers import ModelSerializer
from ..models import PropertyAvailability

class PropertyAvailibilitySerializer(ModelSerializer):   
    class Meta:
        model = PropertyAvailability
        exclude = []