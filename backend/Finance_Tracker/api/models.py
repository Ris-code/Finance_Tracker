from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class MyUser(AbstractUser):
    name = models.CharField(max_length=500)
    Current_Balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)