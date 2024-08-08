from django.urls import path, include

from . import views

urlpatterns = [
    path('', views.request_login),
    path('register-customer', views.request_register_customer),
    path('logout', views.request_logout)
]