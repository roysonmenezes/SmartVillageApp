# urls.py
from django.urls import path
from .views import PublicRegistrationView, AdminUserCreateView

urlpatterns = [
    path('register/', PublicRegistrationView.as_view(), name='public-register'),
    path('admin/create-user/', AdminUserCreateView.as_view(), name='admin-create-user'),
]
