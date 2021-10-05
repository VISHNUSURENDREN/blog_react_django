from django.db.models import fields
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
# from django.contrib.auth.hashers import make_password

class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ['pk','username','first_name','last_name','password','email']
        # extra_kwargs = {
        #     'password':{'write_only':True}
        # }

        # def create(self, validated_data):
        #     password = validated_data.pop('password',None)
        #     instance = self.Meta.model(**validated_data)
        #     if password is not None:
        #         instance.make_password(password)
        #     instance.save()
        #     return instance