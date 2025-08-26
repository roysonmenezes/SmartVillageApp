from rest_framework import serializers
from .models import Announcement
from django.utils import timezone


class AnnouncementSerializer(serializers.ModelSerializer):
    is_active = serializers.SerializerMethodField()

    class Meta:
        model = Announcement
        fields = ["id", "title", "message", "created_at", "expires_at", "is_active"]

    def get_is_active(self, obj):
        return obj.expires_at > timezone.now()
