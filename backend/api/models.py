from django.db import models


class Course(models.Model):
    course_subject = models.CharField(max_length=50)
    course_code = models.IntegerField()
    # course_prereqs = something
    # course_antireqs = something
    # course_coreqs = something
