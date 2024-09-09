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


class Term(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="terms", default=""
    )
    study_term = models.CharField(max_length=4)
    courses = models.JSONField()

    def __str__(self):
        return f"{self.study_term}"
 