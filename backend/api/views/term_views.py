from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models import Term
from api.serializers import TermSerializer


@api_view(["GET"])
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

# @ decorators. 
# Exchange terms/modify the terms 
@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def update_terms(request):
    if request.method =="PUT":
        user = request.user
        terms = TermSerializer(data=request.data)
        if terms.is_valid():
            terms.save(user=request.user)
            return Response(terms.data, status=status.HTTP_200_OK)
        return Response(terms.errors, status=status.HTTP_400_BAD_REQUEST)

