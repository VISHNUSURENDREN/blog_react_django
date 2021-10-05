from django.urls import path
from .views import Login, UserTable

urlpatterns = [
    path('usertable/', UserTable.as_view()),
    path('login/', Login.as_view()),
    path('usertable/<int:id>', UserTable.as_view()),
]