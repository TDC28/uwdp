from api.views.term_views import terms
from django.urls import path

urlpatterns = [path("", terms, name="terms")]
