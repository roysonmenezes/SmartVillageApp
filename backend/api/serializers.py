from rest_framework import serializers
from .models import Announcement, Grievance
from django.utils import timezone


class AnnouncementSerializer(serializers.ModelSerializer):
    is_active = serializers.SerializerMethodField()

    class Meta:
        model = Announcement
        fields = ["id", "title", "message", "created_at", "expires_at", "is_active"]

    def get_is_active(self, obj):
        return obj.expires_at > timezone.now()



class GrievanceSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)  # shows username instead of ID

    class Meta:
        model = Grievance
        fields = ["id", "user", "title", "description", "category", "status", "created_at"]
        read_only_fields = ["id", "user", "created_at"]