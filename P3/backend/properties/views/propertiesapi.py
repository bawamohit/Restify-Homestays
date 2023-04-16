from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView, RetrieveAPIView, \
    ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination

from ..models import Property, PropertyImage
from ..serializers import PropertySerializer, PropertyAvailibilitySerializer, PropertyImageSerializer

# function-based view
@api_view(['GET'])
def test_message(request):
    return Response({"message":"hello it works!"})

class CreateProperty(CreateAPIView):
    serializer_class = PropertySerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class CreatePropertyImage(CreateAPIView):
    serializer_class = PropertyImageSerializer

    def create(self, request, *args, **kwargs):
        instance = get_object_or_404(Property, id=self.kwargs['pk'])
        if instance.owner != self.request.user:
            return Response({'error': 'You are not the owner of this property'}, status=403)
        return super().create(request, *args, **kwargs)
    
    def perform_create(self, serializer):
        instance = get_object_or_404(Property, id=self.kwargs['pk'])
        serializer.save(property=instance)

class PropertyImageList(ListAPIView):
    permission_classes = []
    serializer_class = PropertyImageSerializer
    pagination_class = None

    def get_queryset(self):
        if self.request.method == 'GET':
            instance = get_object_or_404(Property, id=self.kwargs['pk'])
            return instance.propertyimage_set.all()

class PropertyImageDelete(DestroyAPIView):
    serializer_class = PropertyImageSerializer

    def destroy(self, request, *args, **kwargs):
        instance = get_object_or_404(PropertyImage, id=self.kwargs['pk'])
        if instance.property.owner != self.request.user:
            return Response({'error': 'You are not the owner of this property'}, status=403)
        return super().destroy(request, *args, **kwargs)
    
    def get_queryset(self):
        queryset = PropertyImage.objects.filter(id=self.kwargs['pk'])
        return queryset

class PropertyGetSet(RetrieveAPIView, UpdateAPIView):
    serializer_class = PropertySerializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.owner != self.request.user:
            return Response({'error': 'You are not the owner of this property'}, status=403)
        return super().update(request, *args, **kwargs)

    # def retrieve(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     if instance.owner != self.request.user:
    #         return Response({'error': 'You are not the owner of this property'}, status=403)
    #     return super().retrieve(request, *args, **kwargs)

    def get_object(self):
        return get_object_or_404(Property, id=self.kwargs['pk'])

class PropertyList(ListAPIView):
    permission_classes = []
    serializer_class = PropertySerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        if self.request.method == 'GET':
            queryset = Property.objects.all()
            
            wifi = self.request.GET.get('wifi', None)
            if wifi is not None and wifi.lower() == 'true':
                    queryset = queryset.filter(wifi=True)

            petfriendly = self.request.GET.get('petfriendly', None)
            if petfriendly is not None and petfriendly.lower() == 'true':
                queryset = queryset.filter(petfriendly=True)

            tv = self.request.GET.get('tv', None)
            if tv is not None and tv.lower() == 'true':
                queryset = queryset.filter(tv=True)
            
            pillows = self.request.GET.get('pillows', None)
            if pillows is not None and pillows.lower() == 'true':
                queryset = queryset.filter(pillows=True)
            
            sortby = self.request.GET.get('sortby', None)
            if sortby is not None:
                if sortby.lower() == 'guests':
                    queryset = queryset.order_by('-number_of_guests')
                elif sortby.lower() == 'price':
                    queryset = queryset.order_by('-price')
            
            return queryset
        
class PropertyOwnedList(ListAPIView):
    serializer_class = PropertySerializer
    pagination_class = PageNumberPagination

    def get_queryset(self):
        if self.request.method == 'GET':
            return self.request.user.property_set.all()
        
class PropertyDelete(DestroyAPIView):
    serializer_class = PropertySerializer
    
    def get_queryset(self):
        queryset = Property.objects.filter(id=self.kwargs['pk'], owner=self.request.user)
        return queryset

class PropertyAvailability(CreateAPIView):
    serializer_class = PropertyAvailibilitySerializer

    def create(self, request, *args, **kwargs):
       pass