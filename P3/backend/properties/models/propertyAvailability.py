from django.db import models
from .property import Property

class PropertyAvailability(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=20, decimal_places=2)
    start_time = models.DateField(auto_now=False, auto_now_add=False)
    end_time = models.DateField(auto_now=False, auto_now_add=False)
    
    def __str__(self):
        return f"{self.property}"
