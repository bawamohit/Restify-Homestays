from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.contenttypes.models import ContentType
from django.conf import settings

class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE) # the user making the comment
    # to_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    body = models.CharField(max_length=500, blank=False)
    rating = models.PositiveIntegerField(null=True, blank = True)
    # isReply = models.BooleanField()
    replyingTo = models.PositiveIntegerField(null=True, blank = True)
    # propertyID = models.PositiveIntegerField(null=True, blank = True) # GET RID OF THIS, JUST USE OBJECT ID
    # userCommentedOnID = models.PositiveIntegerField(null=True, blank = True) # GET RID OF THIS, JUST USE OBJECT ID
    commentID = models.PositiveIntegerField() # prob can't be null/blank so change that later
    endOfCommentChain = models.BooleanField(null=True, blank = True)

    reply = GenericRelation('Comment')

    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey()

    def __str__(self):
        return f"{self.body}"

