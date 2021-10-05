from django.http import response
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Blog
from .serializers import BlogSerializer
from rest_framework.parsers import JSONParser
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.models import User


class BlogModel(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request,id=None):
        if id:
            try:
                data = Blog.objects.get(blog_id=id)
                blogserializer = BlogSerializer(data)
                dict = blogserializer.data
                dict.update(blog_creation = dict["blog_creation"].split("T")[0])
                dict["blog_updation"] =  dict["blog_updation"].split("T")[0] if  dict["blog_updation"]!=None else None
            except Exception as e:
                return Response(e)
        else:
            data = Blog.objects.all()
            blogserializer = BlogSerializer(data,many=True)
            dict = blogserializer.data
        
        return Response(dict)
    
    def post(self,request,id=None):
        try:
            data = JSONParser().parse(request)
            user_id = data['user_id']
            user = User.objects.get(pk=user_id)
            blog,created = Blog.objects.get_or_create(
                user_id=request.user,
                blog_name = data["blog_name"],
                blog_desc = data["blog_desc"],
                blog_content = data["blog_content"],
            )
            if created:
                return Response({"message":"Watchlist added"})
            return Response({"message":"Watchlist has this movie for you"})
        except Exception as e:
            return Response(e.detail)

        data["user_id"] = User.objects.get(pk=data["user_id"])
        print(data)
        blogserializer = BlogSerializer(data=data)
        if blogserializer.is_valid():
            blogserializer.save()
            return Response(blogserializer.data)
        else:
            return Response("Invalid data. Please try again!")
    
    def put(self,request,id=None):
        if id:
            instance = Blog.objects.get(pk=id)
            data = JSONParser().parse(request)
            data.update({'blog_updation':timezone.now()}) 
            blogserializer = BlogSerializer(instance,data=data)
            if blogserializer.is_valid():
                blogserializer.save()
                return Response(blogserializer.data)
            else:
                return Response("Invalid data. Please try again!")
        return Response("Please enter a ID")
    
    def delete(self,request,id=None):
        if id:
            Blog.objects.get(pk=id).delete() 
            return Response("Deleted Successfully")
        Blog.objects.all().delete() 
        return Response("All the Data Deleted Successfully")


class UserBlog(APIView):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated]

    def get(self, request, userid = None):
        if userid:
            try:
                data = Blog.objects.filter(user_id=userid)
                blogserializer = BlogSerializer(data, many= True)
                print(blogserializer.data)
                return Response(blogserializer.data)
            except Exception as e:
                return Response(e)
