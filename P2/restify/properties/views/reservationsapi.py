from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, RetrieveAPIView, \
    ListAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from ..serializers import ReservationSerializer, NotificationSerializer
from ..models import Reservation, Property, Notification
from rest_framework.pagination import PageNumberPagination
from django.db.models import Q
from django.contrib.contenttypes.models import ContentType

class ReservationPagination(PageNumberPagination):
    page_size = 10

#Create a Reservation request
class CreateReservation(CreateAPIView):
    serializer_class = ReservationSerializer
    
    def create(self, request, *args, **kwargs):
        
        existing = Reservation.objects.filter(property=self.request.data.get('property'))

        # Perform custom logic to create the reservation
        # For example, you could retrieve additional data from the request
        user = request.user
        start_time = self.request.data.get('res_start_time')
        end_time = self.request.data.get('res_end_time')
        if(end_time < start_time):
            return Response({'message': 'Start time cannot be earlier than end time'}, status=400)
        existing = existing.filter(Q(res_start_time__lt=end_time) & Q(res_end_time__gt=start_time))
        if(existing.exists()):
            return Response({'message': 'Reservation already exists at this time range.'}, status=400)
        else:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        
    def perform_create(self, serializer):
        serializer.validated_data['status'] = 'Pending'
        super().perform_create(serializer)

class RetrieveReservation(RetrieveAPIView):
    serializer_class = ReservationSerializer

    def get_object(self):
        return get_object_or_404(Reservation, id=self.kwargs['pk'])

class ReservationStatus(ListAPIView):
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
    serializer_class = ReservationSerializer
    def get_queryset(self):
        return Reservation.objects.filter(requester=self.request.user)

#List of reservations that the host can see(requested on host's property)
class ReservationHost(ListAPIView):
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
            
            # Create notification instance
            message = "A request for cancellation was just made on your property"
            notif = Notification.objects.create(
                user=reservation.property.owner, 
                message=message, 
                content_type=ContentType.objects.get_for_model(Reservation),
                object_id=reservation.pk
            )
            
            reservation.status = 'PendingCancel'
            reservation.save()
        else:
            return Response({'error': 'Reservation cannot cancel'}, status=403)


        serializer = self.serializer_class(reservation)
        return Response(serializer.data)  
      
    def get_queryset(self):
        return Reservation.objects.filter(requester=self.request.user)

    
class ReservationApproveP(UpdateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def post(self, request, *args, **kwargs):
        reservation_id = kwargs.get('pk')

        try:
            reservation = Reservation.objects.get(id=reservation_id)
        except Reservation.DoesNotExist:
            return Response({'error': 'Reservation not found.'}, status=404)

        if reservation.status == 'Pending':
            
            # Create notification instance
            message = "Your pending request has just been approved!"
            notif = Notification.objects.create(
                user=reservation.requester, 
                message=message, 
                content_type=ContentType.objects.get_for_model(Reservation),
                object_id=reservation.pk
            )
            
            reservation.status = 'Approved'
            reservation.save()
        else:
            return Response({'error': 'Cannot approve non-pending'}, status=403)
        

        serializer = self.serializer_class(reservation)
        return Response(serializer.data)
    

class ReservationDenyP(UpdateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def post(self, request, *args, **kwargs):
        reservation_id = kwargs.get('pk')

        try:
            reservation = Reservation.objects.get(id=reservation_id)
        except Reservation.DoesNotExist:
            return Response({'error': 'Reservation not found.'}, status=404)

        if reservation.status == 'Pending':
            
            # Create notification instance
            message = "Your pending request has just been denied"
            notif = Notification.objects.create(
                user=reservation.requester, 
                message=message, 
                content_type=ContentType.objects.get_for_model(Property),
                object_id=reservation.property.pk
            )
            
            reservation.status = 'Denied'
            reservation.save()
        else:
            return Response({'error': 'Cannot deny non-pending'}, status=403)
        

        serializer = self.serializer_class(reservation)
        return Response(serializer.data)
    
class ReservationApproveC(UpdateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def post(self, request, *args, **kwargs):
        reservation_id = kwargs.get('pk')

        try:
            reservation = Reservation.objects.get(id=reservation_id)
        except Reservation.DoesNotExist:
            return Response({'error': 'Reservation not found.'}, status=404)

        if reservation.status == 'PendingCancel':
            
            # Create notification instance
            message = "Your request for cancellation has just been approved!"
            notif = Notification.objects.create(
                user=reservation.requester, 
                message=message, 
                content_type=ContentType.objects.get_for_model(Reservation),
                object_id=reservation.pk
            )
            
            reservation.status = 'Canceled'
            reservation.save()
        else:
            return Response({'error': 'Cannot approve'}, status=403)
        

        serializer = self.serializer_class(reservation)
        return Response(serializer.data)
    
    
class ReservationDenyC(UpdateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def post(self, request, *args, **kwargs):
        reservation_id = kwargs.get('pk')

        try:
            reservation = Reservation.objects.get(id=reservation_id)
        except Reservation.DoesNotExist:
            return Response({'error': 'Reservation not found.'}, status=404)

        if reservation.status == 'PendingCancel':
            # Create notification instance
            message = "Your request for cancellation has just been denied"
            notif = Notification.objects.create(
                user=reservation.requester, 
                message=message, 
                content_type=ContentType.objects.get_for_model(Reservation),
                object_id=reservation.pk
            )
            
            
            reservation.status = 'Approved'
            reservation.save()
        else:
            return Response({'error': 'Cannot deny'}, status=403)
        

        serializer = self.serializer_class(reservation)
        return Response(serializer.data)
    
class ReservationTerminate(UpdateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    def post(self, request, *args, **kwargs):
        reservation_id = kwargs.get('pk')

        try:
            reservation = Reservation.objects.get(id=reservation_id)
        except Reservation.DoesNotExist:
            return Response({'error': 'Reservation not found.'}, status=404)

        if reservation.status == 'Approved':
            
            # Create notification instance
            message = "Your reservation has just been terminated by the host"
            notif = Notification.objects.create(
                user=reservation.requester, 
                message=message, 
                content_type=ContentType.objects.get_for_model(Reservation),
                object_id=reservation.pk
            )
            
            reservation.status = 'Terminated'
            reservation.save()
        else:
            return Response({'error': 'Cannot terminate'}, status=403)
        

        serializer = self.serializer_class(reservation)
        return Response(serializer.data)