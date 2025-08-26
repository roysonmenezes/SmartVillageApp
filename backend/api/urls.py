from django.urls import path
from .views import hello_world , just_print, AnnouncementCreateView, AnnouncementListView

urlpatterns = [
    path('hello/', hello_world, name='hello_world'),  # Maps to /api/hello/
    path('print-something/', just_print, name='just_print'),
    path("announcements/", AnnouncementListView.as_view(), name="announcement-list"),
    path("announcements/create/", AnnouncementCreateView.as_view(), name="announcement-create"),
]