from django.urls import path
from .views import hello_world , just_print 

urlpatterns = [
    path('hello/', hello_world, name='hello_world'),  # Maps to /api/hello/
    path('print-something/', just_print, name='just_print'),
]