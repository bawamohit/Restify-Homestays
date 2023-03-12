from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView, \
    ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from ..serializers import ReservationSerializer
from ..models import Reservation, Property

#Create a Reservation request
class CreateReservation(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ReservationSerializer


class RetrieveReservation(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ReservationSerializer

    def get_object(self):
        return get_object_or_404(Reservation, id=self.kwargs['pk'])

class ReservationStatus(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ReservationSerializer

    def get_queryset(self):
        queryset = Reservation.objects.all()
        status = self.request.query_params.get('status')
        if status:
            stati = [1, 2, 3, 4, 5, 6, 7]
            if status in stati:
                queryset = queryset.filter(status=status)
        return queryset

#List of reservations that the user can see(requested by user)
class ReservationUser(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ReservationSerializer
    def get_queryset(self):
        return Reservation.objects.filter(requester=self.request.user)

#List of reservations that the host can see(requested on host's property)
class ReservationHost(ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ReservationSerializer
    def get_queryset(self):
        return Reservation.objects.filter(property__in=self.request.user.property_set.all())