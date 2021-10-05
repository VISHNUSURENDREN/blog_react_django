from re import T
from rest_framework import serializers
from .models import Blog
from django.contrib.auth.models import User

class BlogSerializer(serializers.ModelSerializer):
    user_id = serializers.StringRelatedField()
     

    class Meta:
        model = Blog
        fields = "__all__"
