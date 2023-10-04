from django.urls import path
from . import views

urlpatterns = [
    path('signup/', views.createpost, name='signup'),
    # path('register/', views.members, name='members'),
]