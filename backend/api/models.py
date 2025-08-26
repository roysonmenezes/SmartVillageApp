# Create your models here.
from django.db import models
from django.utils import timezone
from datetime import timedelta


class Announcement(models.Model):
    title = models.CharField(max_length=255)
    message = models.TextField()
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
