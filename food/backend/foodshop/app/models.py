from django.db import models


class Contact(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=250)
    phone = models.CharField(max_length=20)


class Menu(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.IntegerField()
    image = models.ImageField(upload_to='menus/')
