from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class SessionDataIn(models.Model):
    timeIn=models.DateTimeField(auto_now_add=True)
    user=models.CharField(max_length=50)

class SessionDataOut(models.Model):
    timeOut=models.DateTimeField(auto_now_add=True)
    user=models.CharField(max_length=50)

class User(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()
    is_customer = models.BooleanField()
    is_employee = models.BooleanField()

    class Meta:
        managed = False
        db_table = 'auth_user'