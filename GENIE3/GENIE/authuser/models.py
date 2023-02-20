
from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Profile(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	phone_number = models.CharField(max_length=10,blank=True)
	country = models.CharField(max_length=200, blank=True)
	state = models.CharField(max_length=200, blank=True)


	def __str__(self):
		return self.user.username
