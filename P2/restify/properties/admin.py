from django.contrib import admin
from .models import Comment, Property, Reservation

# Register your models here.
admin.site.register(Comment)
admin.site.register(Property)
admin.site.register(Reservation)