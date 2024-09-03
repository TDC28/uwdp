from api.models import Term
from api.serializers import TermSerializer
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def terms(request):
    if request.method == "GET":
        terms = Term.objects.all().order_by("id")
        term_list = []

        for term in terms:
            term_list.append(TermSerializer(term).data)

        return Response(term_list, status=status.HTTP_200_OK)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def user_terms(request):
    if request.method == "GET":
        user = request.user
        terms = Term.objects.filter(user=user)
        term_list = []

        for term in terms:
            term_list.append(TermSerializer(term).data)

        return Response(term_list, status=status.HTTP_200_OK)


    elif request.method == "POST":
        serializer = TermSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(user=request.user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
