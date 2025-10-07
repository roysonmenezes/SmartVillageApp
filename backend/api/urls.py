
from django.urls import path
from .views import (
    hello_world,
    just_print,
    AnnouncementCreateView,
    AnnouncementListView,
    GrievanceListCreateView,
    GrievanceUpdateView,
    AdvertisementListView,
    AdvertisementCreateView,
    AdvertisementUpdateDeleteView,
)



urlpatterns = [
 
    # General
    path("hello/", hello_world, name="hello_world"),
    path("print-something/", just_print, name="just_print"),

    # Announcements
    path("announcements/", AnnouncementListView.as_view(), name="announcement-list"),
    path("announcements/create/", AnnouncementCreateView.as_view(), name="announcement-create"),

    # Grievances
    path("grievances/", GrievanceListCreateView.as_view(), name="grievance-list-create"),
    path("grievances/<int:pk>/", GrievanceUpdateView.as_view(), name="grievance-update"),

    # Advertisements
    path("advertisements/", AdvertisementListView.as_view(), name="advertisement-list"),
    path("advertisements/create/", AdvertisementCreateView.as_view(), name="advertisement-create"),
    path("advertisements/<int:pk>/", AdvertisementUpdateDeleteView.as_view(), name="advertisement-update-delete"),
]
