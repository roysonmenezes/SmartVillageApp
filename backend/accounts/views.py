# from django.shortcuts import render

# # Create your views here.
# # views.py
# from rest_framework import generics, permissions
# from .serializers import PublicRegistrationSerializer, AdminUserCreateSerializer
# from django.contrib.auth import get_user_model

# User = get_user_model()

# class PublicRegistrationView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = PublicRegistrationSerializer
#     permission_classes = [permissions.AllowAny]  # Anyone can sign up


# class AdminUserCreateView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = AdminUserCreateSerializer
#     permission_classes = [permissions.IsAdminUser]  # Only admins can create staff/admin




from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer, UserProfileSerializer
from rest_framework.parsers import JSONParser



User = get_user_model()

@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(generics.CreateAPIView):
    """
    API endpoint for user registration (signup).
    Accepts: POST with username, email, password, user_type, etc.
    """
    parser_classes = [JSONParser]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

@method_decorator(csrf_exempt, name='dispatch')
class UserProfileView(generics.RetrieveAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user



