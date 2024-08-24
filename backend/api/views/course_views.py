from api.models import Course
from api.serializers import CourseSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET", "POST"])
def courses(request):
    if request.method == "GET":
        courses = Course.objects.all().order_by("subject", "code")
        course_list = []

        for course in courses:
            course_list.append(CourseSerializer(course).data)

        return Response(course_list, status=status.HTTP_200_OK)

    elif request.method == "POST":
        serializer = CourseSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
