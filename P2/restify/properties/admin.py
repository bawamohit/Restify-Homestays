from django.contrib import admin
from .models import Comment, Property, Reservation, Notification

# Register your models here.
admin.site.register(Comment)
admin.site.register(Property)
admin.site.register(Reservation)
admin.site.register(Notification)