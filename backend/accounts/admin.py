# admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = BaseUserAdmin.fieldsets + (
        ("Additional Info", {
            "fields": ("full_name", "phone_number", "address", "date_of_birth", "user_type")
        }),
    )
    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ("Additional Info", {
            "fields": ("full_name", "phone_number", "address", "date_of_birth", "user_type")
        }),
    )

    list_display = ("username", "email", "full_name", "user_type", "is_staff", "is_active")
    search_fields = ("username", "email", "full_name", "phone_number")
    list_filter = ("user_type", "is_staff", "is_active")
