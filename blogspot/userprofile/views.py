from rest_framework.exceptions import ErrorDetail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from .serializers import UserSerializer
from django.http import Http404
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class UserTable(APIView):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def get(self,request, id=None):
        if id:
            try: 
                data = User.objects.get(pk = id)
                userserializer = UserSerializer(data)
            except User.DoesNotExist:
                raise Http404("Given user does not exist")
        else:
            data = User.objects.all()
            userserializer = UserSerializer(data, many=True)
        return Response(userserializer.data)
        
    def post(self,request, id=None):
        data = JSONParser().parse(request)
        userserializer = UserSerializer(data=data)
        if userserializer.is_valid():
            userserializer.save()
            return Response({"success": "Signed in succesfully"})
        print(userserializer.errors['username'][0])
        return Response({"error":str(userserializer.errors['username'][0])})
        
    def put(self,request, id=None):
        if id:
            instance = User.objects.get(pk = id)
            data = JSONParser().parse(request)
            userserializer = UserSerializer(instance, data=data)
            if userserializer.is_valid():
                userserializer.save()
            return Response(userserializer.data)
        else:
            return Response("Send id in url")
            
        
    def delete(self,request, id=None):
        if id:
            User.objects.get(pk = id).delete()
            return Response("User deleted")
        # User.objects.all().delete()
        return Response("Send id in url")




# class Login(APIView):
    
#     def post(self,request):
#         data = request.data
#         user = User.objects.get(username = data["username"])
#         if user.password == (data["password"]):
#             return Response({"success":True , "username":data["username"], "id":user.pk})
#         return Response(False)


        
from rest_framework_simplejwt.tokens import RefreshToken

class Login(APIView):

    def post(self,request):
        data = JSONParser().parse(request)
        try: 
            user = User.objects.get(username = data["username"])
            if user.password == (data["password"]):
                refresh = RefreshToken.for_user(user)
                return Response({"success":True , "username":data["username"], "id":user.pk, "password":user.password,
                                'refresh': str(refresh),'access': str(refresh.access_token)})
            return Response({"error":"Wrong username or password"})
        except:
            return Response({"error":"Wrong username or password"})
        




