from django.db import models
from django.db.models.base import Model
from django.db.models.fields.related import ForeignKey
from django.utils import timezone
from django.contrib.auth.models import User
# Create your models here.

class Blog(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    blog_id = models.AutoField(primary_key=True)
    blog_name = models.TextField(blank=True,null=True)
    blog_desc = models.TextField(blank=True,null=True)
    blog_content = models.TextField(blank=True,null=True)
    blog_creation = models.DateTimeField(default=timezone.now)
    blog_updation = models.DateTimeField(default=None,null=True)

    def __str__(self):
        return self.blog_name