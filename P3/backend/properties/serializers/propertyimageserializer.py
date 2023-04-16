from rest_framework.serializers import ModelSerializer
from ..models import PropertyImage

class PropertyImageSerializer(ModelSerializer):   
    class Meta:
        model = PropertyImage
        exclude = ['property']