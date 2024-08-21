from django.urls import path

from api.views.course_views import get_all_courses


urlpatterns = [
    path("", get_all_courses, name="courses"),
]
