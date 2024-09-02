from django.urls import path

from api.views.course_views import courses

urlpatterns = [path("", courses, name="courses")]