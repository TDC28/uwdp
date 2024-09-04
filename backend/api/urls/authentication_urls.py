from django.urls import path

from api.views.authentication_views import (
    get_user,
    login_view,
    logout_view,
    register_view,
)

urlpatterns = [
    path("login/", login_view, name="login"),
    path("logout/", logout_view, name="logout"),
    path("register/", register_view, name="register"),
    path("user/", get_user, name="get_user"),
]
