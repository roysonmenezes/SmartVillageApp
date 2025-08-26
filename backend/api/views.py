
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, permissions
from django.utils import timezone
from .models import Announcement
from .serializers import AnnouncementSerializer


# Create your views here.

@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello, Expooo!"})

def root_view(request):
    return HttpResponse("<h1>Welcome to Django Backend</h1>")


def just_print(request):
    if request.method == 'GET':
        print("This was accessed!")
        return HttpResponse("Printed to console!")
    else:
        return HttpResponse("Only GET requests are allowed for this endpoint.", status=405)
    


# Admin: Create announcement
class AnnouncementCreateView(generics.CreateAPIView):
    queryset = Announcement.objects.all()
    serializer_class = AnnouncementSerializer
    permission_classes = [permissions.IsAdminUser]   # only admin can create


# Villager (or anyone logged in): List active announcements
class AnnouncementListView(generics.ListAPIView):
    serializer_class = AnnouncementSerializer
    permission_classes = [permissions.IsAuthenticated]   # villagers must be logged in

    def get_queryset(self):
        return Announcement.objects.filter(expires_at__gt=timezone.now()).order_by("-created_at")
