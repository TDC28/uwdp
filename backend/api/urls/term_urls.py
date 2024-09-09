from api.views.term_views import terms, user_terms
from django.urls import path

urlpatterns = [
    path("all-terms/", terms, name="terms"),
    path("", user_terms, name="user_terms"),
]
