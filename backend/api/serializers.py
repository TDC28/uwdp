from django.contrib.auth.models import User
from rest_framework import serializers

from api.models import Course, UserTerms


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email")


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "password", "email")

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
            email=validated_data["email"],
        )

        return user


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = (
            "subject",
            "code",
            "prereqs",
            "antireqs",
            "coreqs",
        )


class UserTermsSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = UserTerms
        fields = ("username", "terms")
