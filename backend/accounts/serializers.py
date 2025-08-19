# # serializers.py
# from rest_framework import serializers
# from django.contrib.auth import get_user_model
# from django.contrib.auth.password_validation import validate_password

# User = get_user_model()

# class PublicRegistrationSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True, min_length=6, validators=[validate_password])
#     password_confirm = serializers.CharField(write_only=True)

#     class Meta:
#         model = User
#         fields = [
#             'username',
#             'email',
#             'full_name',
#             'phone_number',
#             'address',
#             'date_of_birth',
#             'password',
#             'password_confirm'
#         ]

#     def validate(self, attrs):
#         if attrs['password'] != attrs['password_confirm']:
#             raise serializers.ValidationError("Passwords don't match")
#         return attrs

#     def create(self, validated_data):
#         validated_data.pop('password_confirm')
#         password = validated_data.pop('password')

#         # Force normal user type
#         return User.objects.create_user(
#             password=password,
#             user_type='user',
#             is_staff=False,
#             is_superuser=False,
#             **validated_data
#         )


# class AdminUserCreateSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True, min_length=6, validators=[validate_password])
#     password_confirm = serializers.CharField(write_only=True)

#     class Meta:
#         model = User
#         fields = [
#             'username',
#             'email',
#             'full_name',
#             'phone_number',
#             'address',
#             'date_of_birth',
#             'user_type',      # Admin can set user_type
#             'is_staff',       # Admin can make staff
#             'is_superuser',   # Admin can make superuser
#             'password',
#             'password_confirm'
#         ]

#     def validate(self, attrs):
#         if attrs['password'] != attrs['password_confirm']:
#             raise serializers.ValidationError("Passwords don't match")
#         return attrs

#     def create(self, validated_data):
#         validated_data.pop('password_confirm')
#         password = validated_data.pop('password')
#         return User.objects.create_user(password=password, **validated_data)


from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User

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
