from django.urls import path
from . import views

app_name="accounts"
urlpatterns = [
    path('create-user/', views.UserCreate.as_view(), name='create-user'),
    path('update-user/<int:pk>/', views.UserGetSet.as_view(), name='update-user'),
    path('create-comment/', views.CommentCreate.as_view(), name='create-comment'),
    path('view-comment/', views.CommentGetSet.as_view(), name='view-comment'),
]
