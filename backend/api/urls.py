from django.urls import path
from .views import hello_world , just_print, AnnouncementCreateView, AnnouncementListView, GrievanceListCreateView, GrievanceUpdateView
from .views import AdvertisementListView, AdvertisementCreateView, AdvertisementUpdateDeleteView

urlpatterns = [
    path('hello/', hello_world, name='hello_world'),  # Maps to /api/hello/
    path('print-something/', just_print, name='just_print'),
    path("announcements/", AnnouncementListView.as_view(), name="announcement-list"),
    path("announcements/create/", AnnouncementCreateView.as_view(), name="announcement-create"),
    path("grievances/", GrievanceListCreateView.as_view(), name="grievance-list-create"),
    path("grievances/<int:pk>/", GrievanceUpdateView.as_view(), name="grievance-update"),
]


# advertizement related urls
urlpatterns = [
    path("advertisements/", AdvertisementListView.as_view(), name="advertisement-list"),  # villagers see only active ads
    path("advertisements/create/", AdvertisementCreateView.as_view(), name="advertisement-create"),  # admin only
    path("advertisements/<int:pk>/", AdvertisementUpdateDeleteView.as_view(), name="advertisement-update-delete"),  # admin only
]