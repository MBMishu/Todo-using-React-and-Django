from django.shortcuts import render, redirect
from django.http import HttpResponse , JsonResponse
# Create your views here.


def home(request):

    return render(request,'index.html')
