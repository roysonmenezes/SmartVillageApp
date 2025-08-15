from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Choices for user type
    ADMIN = 'admin'
    VILLAGER = 'villager'
    USER_TYPE_CHOICES = [
        (ADMIN, 'Admin'),
        (VILLAGER, 'Villager'),
    ]
    # Custom fields
    user_type = models.CharField(
        max_length=10, 
        choices=USER_TYPE_CHOICES, 
        default=VILLAGER,
        help_text="Type of user - Admin or Villager"
    )
    full_name = models.CharField(
        max_length=100, 
        blank=True, 
        null=True,
        help_text="Full name of the user"
    )
    phone_number = models.CharField(
        max_length=15, 
        unique=True, 
        blank=True, 
        null=True,
        help_text="Phone number must be unique"
    )
    address = models.TextField(
        blank=True, 
        null=True,
        help_text="Complete address of the user"
    )
    date_of_birth = models.DateField(
        blank=True, 
        null=True,
        help_text="Date of birth"
    )

    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return f"{self.username} ({self.get_user_type_display()})"

    def get_full_name(self):
        """Return the full name if available, otherwise return username"""
        return self.full_name if self.full_name else self.username

    def is_admin(self):
        """Check if user is admin type"""
        return self.user_type == self.ADMIN

    def is_villager(self):
        """Check if user is villager type"""
        return self.user_type == self.VILLAGER
