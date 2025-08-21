from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True, label="Confirm Password")

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "password2",
            "user_type",
            "full_name",
            "phone_number",
            "address",
            "date_of_birth",
        ]

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")
        user = User.objects.create(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            user_type=validated_data.get("user_type", User.VILLAGER),
            full_name=validated_data.get("full_name", ""),
            phone_number=validated_data.get("phone_number", ""),
            address=validated_data.get("address", ""),
            date_of_birth=validated_data.get("date_of_birth", None),
        )
        user.set_password(validated_data["password"])  # Hash password
        user.save()
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id", "username", "email", "full_name", "phone_number",
            "address", "date_of_birth", "user_type"
        ]



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add user_type to the response
        data['user_type'] = getattr(self.user, 'user_type', 'user')

        return data