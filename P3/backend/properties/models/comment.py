from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator

class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) # the user making the comment
    date = models.DateTimeField(auto_now_add=True)
    body = models.CharField(max_length=500, blank=False)
    rating = models.PositiveIntegerField(null=True, blank = True, validators=[
            MinValueValidator(1),
            MaxValueValidator(5)
        ])
    replyingTo = models.PositiveIntegerField(null=True, blank = True)
    commentID = models.PositiveIntegerField()
    endOfCommentChain = models.BooleanField(null=True, blank = True)

    reply = GenericRelation('Comment')
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey()

    def __str__(self):
        return f"{self.body}"

