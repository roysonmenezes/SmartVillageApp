# Create your models here.
from django.db import models
from django.utils import timezone
from datetime import timedelta
# from django.contrib.auth.models import User
from django.conf import settings   # ✅ use this instead of auth.models.User



class Announcement(models.Model):
    CATEGORY_CHOICES = [
        ("general", "General"),
        ("water", "Water Supply"),
        ("electricity", "Electricity"),
        ("roads", "Roads"),
        ("health", "Health"),
        ("other", "Other"),
    ]
    title = models.CharField(max_length=255)
    message = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="general")
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

    # Optional: mark announcement as active only if not expired
    @property
    def is_active(self):
        return self.expires_at > timezone.now()

    def save(self, *args, **kwargs):
        # If expires_at is not set, default to 7 days from now
        if not self.expires_at:
            self.expires_at = timezone.now() + timedelta(days=7)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} (expires {self.expires_at})"


class Grievance(models.Model):
    CATEGORY_CHOICES = [
        ("water", "Water Supply"),
        ("electricity", "Electricity"),
        ("roads", "Roads"),
        ("health", "Health"),
        ("other", "Other"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="grievances")  # ✅ fixed
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="other")
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[("pending", "Pending"), ("in_progress", "In Progress"), ("resolved", "Resolved")],
        default="pending"
    )

    def __str__(self):
        return f"{self.title} by {self.user}"


class Advertisement(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to="advertisements/")   # poster upload
    redirect_url = models.URLField(blank=True, null=True)    # optional link (Amazon, website, etc.)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    expiry_date = models.DateTimeField()

    def is_expired(self):
        return timezone.now() > self.expiry_date

    def __str__(self):
        return f"{self.title} ({'Expired' if self.is_expired() else 'Active'})"