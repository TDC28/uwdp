from django.db import models

class User(models.Model):
    username = models.CharField(max_length=64)
    password = models.CharField(max_length=256)
    email = models.CharField(max_length=256)
    date_created = models.DateTimeField(blank=True)
    graduation_year = models.IntegerField()

    def __str__(self):
        return self.username
