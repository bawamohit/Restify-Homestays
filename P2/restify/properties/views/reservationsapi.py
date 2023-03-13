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
        queryset = Reservation.objects.filter(requester=self.request.user)
        status = self.request.query_params.get('status')
        if status:
            stati = ['Pending', 'Denied', 'Expired', 'Approved', 'Canceled', 'Terminated', 'PendingCancel', 'Completed']
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
    
    
# 1. Pending: the user makes a request to reserve a property on one or more consecutive dates.
# 2. Denied: the host, i.e., the owner of the property, declines the reservation request. 
# 3. Expired: the host did not respond to a reservation request within a user-defined time window.
# 4. Approved: the reservation request is approved.
# 5. Canceled: the reservation was approved but later canceled by the user.
# 6. Terminated: the reservation was approved but later canceled by the host.
# 7. PendingCancel: the reservation is approved but user requested a cancelation
# 8. Completed: the reservation is realized, i.e., the user went to the property and stayed there.    
    
class ReservationCancel(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ReservationSerializer

    def post(self, request, *args, **kwargs):
        reservation_id = kwargs.get('pk')

        try:
            reservation = Reservation.objects.get(id=reservation_id)
        except Reservation.DoesNotExist:
            return Response({'error': 'Reservation not found.'}, status=404)
        if reservation.status == 'Pending':
            reservation.status = 'Canceled'
            reservation.save()
        elif reservation.status == 'Approved':
            reservation.status = 'PendingCancel'
            reservation.save()
        else:
            return Response({'error': 'Reservation cannot cancel'}, status=403)


        serializer = self.serializer_class(reservation)
        return Response(serializer.data)  
      
    def get_queryset(self):
        return Reservation.objects.filter(requester=self.request.user)
    
class ReservationApproveP(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def post(self, request, *args, **kwargs):
        reservation_id = kwargs.get('pk')

        try:
            reservation = Reservation.objects.get(id=reservation_id)
        except Reservation.DoesNotExist:
            return Response({'error': 'Reservation not found.'}, status=404)

        if reservation.status == 'Pending':
            reservation.status = 'Approved'
            reservation.save()
        else:
            return Response({'error': 'Cannot approve non-pending'}, status=403)
        

        serializer = self.serializer_class(reservation)
        return Response(serializer.data)
    

class ReservationDenyP(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def post(self, request, *args, **kwargs):
        reservation_id = kwargs.get('pk')

        try:
            reservation = Reservation.objects.get(id=reservation_id)
        except Reservation.DoesNotExist:
            return Response({'error': 'Reservation not found.'}, status=404)

        if reservation.status == 'Pending':
            reservation.status = 'Denied'
            reservation.save()
        else:
            return Response({'error': 'Cannot deny non-pending'}, status=403)
        

        serializer = self.serializer_class(reservation)
        return Response(serializer.data)
    
class ReservationApproveC(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def post(self, request, *args, **kwargs):
        reservation_id = kwargs.get('pk')

        try:
            reservation = Reservation.objects.get(id=reservation_id)
        except Reservation.DoesNotExist:
            return Response({'error': 'Reservation not found.'}, status=404)

        if reservation.status == 'PendingCancel':
            reservation.status = 'Canceled'
            reservation.save()
        else:
            return Response({'error': 'Cannot approve'}, status=403)
        

        serializer = self.serializer_class(reservation)
        return Response(serializer.data)
    
    
class ReservationDenyC(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def post(self, request, *args, **kwargs):
        reservation_id = kwargs.get('pk')

        try:
            reservation = Reservation.objects.get(id=reservation_id)
        except Reservation.DoesNotExist:
            return Response({'error': 'Reservation not found.'}, status=404)

        if reservation.status == 'PendingCancel':
            reservation.status = 'Approved'
            reservation.save()
        else:
            return Response({'error': 'Cannot deny'}, status=403)
        

        serializer = self.serializer_class(reservation)
        return Response(serializer.data)
    
class ReservationTerminate(UpdateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def post(self, request, *args, **kwargs):
        reservation_id = kwargs.get('pk')

        try:
            reservation = Reservation.objects.get(id=reservation_id)
        except Reservation.DoesNotExist:
            return Response({'error': 'Reservation not found.'}, status=404)

        if reservation.status == 'Approved':
            reservation.status = 'Terminated'
            reservation.save()
        else:
            return Response({'error': 'Cannot terminate'}, status=403)
        

        serializer = self.serializer_class(reservation)
        return Response(serializer.data)