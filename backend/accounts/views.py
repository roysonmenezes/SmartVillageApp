from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import generics, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer, UserProfileSerializer, UpdateProfileSerializer, CustomTokenObtainPairSerializer
from rest_framework.parsers import JSONParser
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny






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
    # permission_classes = [permissions.IsAuthenticated]
    permission_classes = [AllowAny]

    def get_object(self):
        return self.request.user

@method_decorator(csrf_exempt, name='dispatch')
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class UpdateProfileView(generics.UpdateAPIView):
    """
    API endpoint for users to update their own profile.
    """
    serializer_class = UpdateProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # ✅ only allow logged-in user to update their own profile
        return self.request.user

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Return the full profile (with profile_picture URL etc.)
        return Response(UserProfileSerializer(instance).data, status=status.HTTP_200_OK)
