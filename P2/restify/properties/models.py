from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.conf import settings
from django.contrib.auth.models import User


# Create your models here.
class Comment(models.Model):
    user = models.OneToOneField(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    body = models.CharField(max_length = 500, blank=False)
    rating = models.IntegerField()
    reply = GenericRelation('Comment')

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey()

    def __str__(self):
        return f"{self.user}"
    
    
class Property(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    postal_code = models.CharField(max_length=50)
    images = models.ImageField(upload_to='avatars/', null=True, blank = True) # not sure how this part works
    description = models.CharField(max_length=400)
    number_of_guests = models.IntegerField()
    number_of_beds = models.IntegerField()
    number_of_baths = models.IntegerField()
    wifi = models.BooleanField()
    petfriendly = models.BooleanField()
    tv = models.BooleanField()
    pillows = models.BooleanField()
    reviews = GenericRelation('Comment')
    
    def __str__(self):
        return f"{self.name}"


class PropertyAvailabilities(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=20, decimal_places=2)
    start_time = models.DateField(auto_now=False, auto_now_add=False)
    end_time = models.DateField(auto_now=False, auto_now_add=False)
    
    def __str__(self):
        return f"{self.property}"
    
class Reservation(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    status = models.IntegerField()
    requester = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    res_start_time = models.DateField(auto_now=False, auto_now_add=False)
    res_end_time = models.DateField(auto_now=False, auto_now_add=False)
    price = models.DecimalField(max_digits=20, decimal_places=2)
    
    def __str__(self):
        return f"{self.property}"