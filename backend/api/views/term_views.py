from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.models import UserTerms
from api.serializers import UserTermsSerializer


@api_view(["GET"])
def terms(request):
    if request.method == "GET":
        terms = UserTerms.objects.all().order_by("id")
        term_list = []

        for term in terms:
            term_list.append(TermSerializer(term).data)

        return Response(term_list, status=status.HTTP_200_OK)


@api_view(["GET", "PUT"])
@permission_classes([IsAuthenticated])
def user_terms(request):
    user = request.user

    try:
        userterms = UserTerms.objects.get(user=user)

    except UserTerms.DoesNotExist:
        if request.method == "PUT":
            userterms = UserTerms(user=user)
        else:
            return Response(
                {"error": "UserTerms not found."}, status=status.HTTP_404_NOT_FOUND
            )

    if request.method == "GET":
        return Response(UserTermsSerializer(userterms).data, status=status.HTTP_200_OK)

    elif request.method == "PUT":
        serialized_userterms = UserTermsSerializer(userterms, data=request.data)

        if serialized_userterms.is_valid():
            serialized_userterms.save()

            return Response(serialized_userterms.data, status=status.HTTP_200_OK)

        return Response(serialized_userterms.errors, status=status.HTTP_400_BAD_REQUEST)
