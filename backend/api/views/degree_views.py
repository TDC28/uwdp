from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models import Degree
from api.serializers import DegreeSerializer


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def full_program(request):
    if request.method == "GET":
        program = Degree.objects.all()

        program_list = []

        for field_of_study in program:
            program_list.append(DegreeSerializer(field_of_study).data)

        return Response(program_list, status=status.HTTP_200_OK)

    elif request.method == "POST":
        program = DegreeSerializer(data=request.data)

        if program.is_valid():
            program.save()

            return Response(program.data, status=status.HTTP_200_OK)

        return Response(program.errors, status=status.HTTP_400_BAD_REQUEST)
