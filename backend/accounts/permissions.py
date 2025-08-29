from rest_framework import permissions

class IsCustomAdmin(permissions.BasePermission):
    """
    Allows access only to users with user_type='admin'.
    """
    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and 
            getattr(request.user, "user_type", None) == "admin"
        )
