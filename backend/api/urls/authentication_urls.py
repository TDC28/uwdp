from django.urls import path

from api.views.authentication_views import login_view, register_view

urlpatterns = [
    path("login/", login_view, name="login"),
    path("register/", register_view, name="register"),
]
