from django.urls import path
from .views import BlogModel, UserBlog

urlpatterns = [
    path('blogapi/',BlogModel.as_view()),
    path('blogapi/<int:id>',BlogModel.as_view()),
    path('userblogs/<int:userid>',UserBlog.as_view()),
]