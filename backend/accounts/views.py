from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework import generics, permissions
from .serializers import PublicRegistrationSerializer, AdminUserCreateSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class PublicRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = PublicRegistrationSerializer
    permission_classes = [permissions.AllowAny]  # Anyone can sign up


class AdminUserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = AdminUserCreateSerializer
    permission_classes = [permissions.IsAdminUser]  # Only admins can create staff/admin
