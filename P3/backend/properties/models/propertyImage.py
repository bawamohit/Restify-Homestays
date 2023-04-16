from django.db import models
from .property import Property

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='avatars/')