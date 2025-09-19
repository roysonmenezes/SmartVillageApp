from django.urls import path
from .views import (
    hello_world,
    SurveyListCreateView,
    SurveyDetailView,
    ResponseCreateView,
    SurveyExportExcelView,
)

urlpatterns = [
    path("hello/", hello_world, name="survey-hello"),
    path("surveys/", SurveyListCreateView.as_view(), name="survey-list-create"),
    path("surveys/<int:pk>/", SurveyDetailView.as_view(), name="survey-detail"),
    path("<int:pk>/export/", SurveyExportExcelView.as_view(), name="survey-export"),
    path("responses/", ResponseCreateView.as_view(), name="response-create"),
]
