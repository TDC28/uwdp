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


class UserTerms(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_terms")
    terms = models.JSONField(default=list)

    def __str__(self):
        return f"{self.user}'s terms"
    
# DEGREE_CHOICES = [

# ("SCI", "Bachelor's of Science (BSc)"),
# ("ENG", "Bachelor's of Engineering (BEng)"),
# ("ART", "Bachelor's of Arts (BA)"), 
# ("MATH", "Bachelor's of Math (BMath)"),
# (),
# (),
# (), 
# (), 

# ]

class Program(models.Model):
    # initiates the user definition in the Program model
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_program")
    # Major for user to type in a JSON field,
    major = models.JSONField()
    #{Major: {Mathematical Physics, Computer Science, ...}}
    minor = models.JSONField()
     #{Minor: {Computing, ...}}
    option = models.JSONField()
     #{Option: {BBA ...}}

    def __str__(self):
        return f"{self.user}'s program"


    


# contains 3 JSON fields, Major, Minor and Option 

# class Program(models.Model):


# class Minor(models.Model):
