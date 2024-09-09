from django.contrib.auth import authenticate, login, logout
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import csrf_exempt

from api.serializers import RegisterSerializer, UserSerializer


@api_view(["POST"])
def login_view(request):
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)

        serialized_user = UserSerializer(user)
        return Response(serialized_user.data)

    return Response(
        {"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["POST"])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def logout_view(request):
    if request.user.is_authenticated:
        logout(request)

        return Response(
            {"message": "Successfully logged out"}, status=status.HTTP_200_OK
        )
    else:
        return Response(
            {"error": "User not authenticated"}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["GET"])
def get_user(request):
    if request.user.is_authenticated:
        return Response(
            {"user": request.user.username, "user_status": "logged-in"},
            status=status.HTTP_200_OK,
        )

    else:
        return Response(
            {"user": "Not logged in", "user_status": "logged-out"},
            status=status.HTTP_200_OK,
        )
