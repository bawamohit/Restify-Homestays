from django.db.models.signals import pre_delete, post_delete, pre_save
from .models import Reservation, Notification
from accounts.models import User
from django.dispatch import receiver

@receiver(pre_delete, sender=Reservation)
def pre_delete_reservation(sender, **kwargs):
    pass

@receiver(post_delete, sender=Reservation)
def post_delete_reservation(sender, instance, **kwargs):
    message = "A reservation you made was removed as the host removed the property from the market."
    # print(sender.requester)
    notif = Notification(user=instance.requester, message=message)
    notif.save()