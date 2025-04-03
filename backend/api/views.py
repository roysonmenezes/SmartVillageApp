from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello, Expo!"})

def root_view(request):
    return HttpResponse("<h1>Welcome to Django Backend</h1>")
