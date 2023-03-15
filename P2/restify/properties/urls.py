from django.urls import path
from . import views

app_name="properties"
urlpatterns = [ 
    path('test/', views.test_message, name='test'),
    path('property-create/', views.CreateProperty.as_view(), name='property-create'),
    path('property-update/<int:pk>/', views.PropertyGetSet.as_view(), name='property-update'),
    path('property-view/<int:pk>/', views.PropertyGetSet.as_view(), name='property-view'),
    path('property-search/', views.PropertyList.as_view(), name='property-search'),
    path('property-owned/', views.PropertyOwnedList.as_view(), name='property-owned'),
    path('property-delete/<int:pk>/', views.PropertyDelete.as_view(), name='property-delete'),
    path('property-add-availability/', views.test_message, name='property-add-availability'),
    path('property-delete-availability/', views.test_message, name='property-delete-availability'),
    path('reservation-create/', views.CreateReservation.as_view(), name='reservation-create'),
    path('reservation-view/<int:pk>/', views.RetrieveReservation.as_view(), name='reservation-view'),
    path('reservation-user/', views.ReservationUser.as_view(), name='reservation-user'),
    path('reservation-host/', views.ReservationHost.as_view(), name='reservation-host'),
    path('reservation-status/', views.ReservationStatus.as_view(), name='reservation-status'),
    path('reservation-cancel/<int:pk>/', views.ReservationCancel.as_view(), name='reservation-cancel'),
    path('reservation-approve-pending/<int:pk>/', views.ReservationApproveP.as_view(), name='reservation-approve-pending'),
    path('reservation-deny-pending/<int:pk>/', views.ReservationDenyP.as_view(), name='reservation-deny-pending'),
    path('reservation-approve-cancel/<int:pk>/', views.ReservationApproveC.as_view(), name='reservation-approve-cancel'),
    path('reservation-deny-cancel/<int:pk>/', views.ReservationDenyC.as_view(), name='reservation-deny-cancel'),
    path('reservation-terminate/<int:pk>/', views.ReservationTerminate.as_view(), name='reservation-terminate'),
    path('notification/<int:pk>/', views.NotificationList.as_view(), name='notification-list'),
    path('notification/list/', views.RetrieveNotification.as_view(), name='notification-read'),
    path('notification/delete/<int:pk>/', views.NotificationDelete.as_view(), name='notification-delete'),
]

