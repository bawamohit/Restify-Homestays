from django.db import models
from django.contrib.contenttypes.fields import GenericRelation
from django.conf import settings

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