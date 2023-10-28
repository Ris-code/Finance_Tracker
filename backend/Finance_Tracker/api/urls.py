from django.urls import path
from . import views

urlpatterns = [
    path('', views.front_page, name='welcome_page'),
    path('signup/', views.createpost, name='signup'),
    path('login/', views.login_user, name='login'),
    path('home/', views.home_page, name='main_page'),
    path('update-balance/', views.update_balance, name='update'),
    # path('get_user_data/', views.get_data, name='get_user_data'),
    # path('api/get_data', views.get_data, name='get data')

    # path('register/', views.members, name='members'),
]