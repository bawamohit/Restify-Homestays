from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.conf import settings



# Create your models here.
class User(AbstractUser):
    phoneNumber = models.CharField(max_length = 10) # or an int? include dashes?
    avatars = models.ImageField(upload_to='avatars/', null=True, blank=True) # add avatars/pictures folder
    
    comments = GenericRelation('properties.Comment')

    def __str__(self):
        return f"{self.username}"

