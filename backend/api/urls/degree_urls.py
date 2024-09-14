from api.views.degree_views import full_program

from django.urls import path

urlpatterns = [
    path("full-program/", full_program, name="student's full program"),
]




