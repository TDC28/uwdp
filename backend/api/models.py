from django.contrib.auth.models import User
from django.db import models


class Course(models.Model):
    code = models.IntegerField()
    subject = models.CharField(max_length=50)
    prereqs = models.JSONField()
    antireqs = models.JSONField()
    coreqs = models.JSONField()

    def __str__(self):
        return f"{self.subject} {self.code}"


class UserTerms(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_terms")
    terms = models.JSONField(default=list)

    def __str__(self):
        return f"{self.user}'s terms"


class Degree(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_program"
    )
    major = models.JSONField(default=list)
    minor = models.JSONField(default=list)
    option = models.JSONField(default=list)

    def __str__(self):
        return f"{self.user}'s program"


# contains 3 JSON fields, Major, Minor and Option

# class Program(models.Model):


# class Minor(models.Model):
