from django.urls import path
from . import views

app_name="properties"
urlpatterns = [ 
    path('test/', views.test_message, name='test'),
]
