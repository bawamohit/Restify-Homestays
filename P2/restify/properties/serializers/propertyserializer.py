from rest_framework.serializers import ModelSerializer, CharField
from ..models import Property

class PropertySerializer(ModelSerializer):   
    owner_username = CharField(read_only=True, source='owner.username', allow_null=True)

    class Meta:
        model = Property
        exclude = []