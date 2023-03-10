from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.conf import settings

# class Comment(models.Model):
#     user = models.OneToOneField(to=settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     body = models.CharField(max_length = 500, blank=False)
#     rating = models.IntegerField()
#     reply = GenericRelation('Comment')

#     content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
#     object_id = models.PositiveIntegerField()
#     content_object = GenericForeignKey()

#     def __str__(self):
#         return f"{self.user}"
    
class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # to_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    body = models.CharField(max_length=500, blank=False)
    rating = models.PositiveIntegerField()

    reply = GenericRelation('Comment')

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey()

    def __str__(self):
        return f"{self.user}"