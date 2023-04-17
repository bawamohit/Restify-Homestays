from django.contrib import admin
from .models import Comment, Property, Reservation, Notification, PropertyImage

# Register your models here.
admin.site.register(Comment)
admin.site.register(Property)
admin.site.register(Reservation)
admin.site.register(Notification)
admin.site.register(PropertyImage)