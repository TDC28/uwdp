from api.models import Course
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.serializers import CourseSerializer


@api_view(["GET"])
def get_all_courses(request):
    courses = Course.objects.all().order_by("subject", "code")
    course_list = []

    for course in courses:
        course_list.append(CourseSerializer(course).data)

    return Response(course_list, status=status.HTTP_200_OK)
