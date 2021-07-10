from django.db import models
from django.contrib.auth.models import User,Group

# Create your models here.

class Profile(models.Model):
    prouser = models.OneToOneField(User,null=True,blank=True,on_delete=models.CASCADE)
    name =models.CharField(max_length=255,null=True,blank=True)
    image = models.ImageField(upload_to="profile/",null=True,blank=True)
    
    def __str__(self):
        return self.prouser.username


    
class Task(models.Model):
    username = models.ForeignKey(User,on_delete=models.CASCADE,default=None,null=True,blank=True)
    title = models.CharField(max_length = 200)
    task_completed = models.BooleanField(default=False,blank=True)
    

    def __str__(self):
        return self.title

