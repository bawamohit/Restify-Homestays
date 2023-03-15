from django.db.models.signals import pre_delete, post_delete, pre_save, post_save
from .models import Reservation, Notification, Property
from accounts.models import User
from django.dispatch import receiver
from django.contrib.contenttypes.models import ContentType

@receiver(pre_delete, sender=Reservation)
def pre_delete_reservation(sender, **kwargs):
    pass

@receiver(post_delete, sender=Reservation)
def post_delete_reservation(sender, instance, **kwargs):
    message = "A reservation you made was removed as the host removed the property from the market."
    # print(sender.requester)
    notif = Notification(user=instance.requester, message=message)
    notif.save()
    
@receiver(post_save, sender=Reservation)
def post_create_reservation(sender, instance, created, **kwargs):
    if created:
        message = "A reservation was just made on your property"
        notif = Notification(user=instance.property.owner, message=message, 
                             content_type=ContentType.objects.get_for_model(Reservation), object_id=instance.id)
        notif.save()
        