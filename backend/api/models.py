from django.db import models


class Course(models.Model):
    subject = models.CharField(max_length=50)
    code = models.IntegerField()
    prereqs = models.CharField(max_length=256, default="")
    antireqs = models.CharField(max_length=256, default="")
    coreqs = models.CharField(max_length=256, default="")

    def __str__(self):
        return f"{self.subject} {self.code}"
