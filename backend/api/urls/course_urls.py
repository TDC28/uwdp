from django.urls import path

from api.views.course_views import courses_view


urlpatterns = [
    path("", courses_view, name="courses"),
]
