from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView, \
    ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from ..models import Store
from ..serializers import StoreSerializer

# function-based view
@api_view(['GET'])
def stores_list(request):
    stores = Store.objects.filter(is_active=True)
    return Response([{
        'name' : store.name,
        'url' : store.url,
        'is_active' : store.is_active,
    } for store in stores ])

# class-based view
class StoresManage(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        stores = Store.objects.all()
        serializer = StoreSerializer(stores, many=True)
        return Response(serializer.data)

class StoresOwned(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = StoreSerializer
    def get_queryset(self):
        return Store.objects.filter(owner=self.request.user)

class StoresCreate(CreateAPIView):
    serializer_class = StoreSerializer

class StoreGetSet(RetrieveAPIView, UpdateAPIView):
    serializer_class = StoreSerializer
    def get_object(self):
        return get_object_or_404(Store, id=self.kwargs['pk'])

