import re
from django.core import paginator
from django.shortcuts import render, redirect
from django.http import HttpResponse , JsonResponse

from rest_framework import status ,viewsets, permissions, generics
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from django.contrib.auth import authenticate


# auth token
from knox.models import AuthToken

# Create your views here.
from .models import *
from .serializers import *

@api_view(['GET'])
def apiOverview(request):

    api_urls = {
        'List':'/task-list/',
        'Details View':'/task-list-Details/<str:pk>/',
        'Create':'/task-create/<str:pk>/',
        'Update':'/task-update/<str:pk>/',
        'Delete':'/task-delete/<str:pk>/',
    }
    return Response(api_urls)

@api_view(['GET'])
@permission_classes([IsAuthenticated])  
def tasklist(request):
   
    tasks  = Task.objects.filter(username = request.user).order_by('-id')
    
    paginator = PageNumberPagination()
    paginator.page_size = 5
    result_page = paginator.paginate_queryset(tasks,request)
    
    serializer = TaskSerializer(result_page,many=True)
    
    # serializer = TaskSerializer(tasks,many=True)
    # return Response(serializer.data)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])  
def tasklistDetails(request,pk):
    tasks  = Task.objects.get(id=pk)
    serializer = TaskSerializer(tasks,many=False)
    
    serializer_data = serializer.data
    
    all_data={}
    
    
    
    if tasks.username is not None:
        user_info = Profile.objects.get(prouser = tasks.username)
        user_serializer = UserSerializer(user_info,many=False)
        
        serializer_data["username"] = user_serializer.data
        
    all_data.update(serializer_data)
    
    return Response(all_data)
    # return Response(serializer_data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])  
def taskcreate(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response({
        "msg":"New Todo has been added in your list",
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])  
def taskUpdate(request,pk):
    tasks  = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=tasks, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response({
        "msg":"Task has been completed",
    })

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def taskDelete(request,pk):
    tasks  = Task.objects.get(id=pk)
    tasks.delete()
    return Response("Item deleted")

@api_view(['POST'])
def RegistrationApi(request):
    serializer = CreateUserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        username = user.username
        Profile.objects.create(
                prouser=user, name=username
            )
        return Response({
            "msg": "Successfully create user",
            "user": serializer.data,
            "token": AuthToken.objects.create(user)[1]
        })
    else:
        return Response({"msg":"Username Exits",})



@api_view(['POST'])
def LoginApi(request):
    serializer = LoginUserSerializer(data=request.data)
    if serializer.is_valid():
        
        user = authenticate(request,**serializer.data)
        
        if user is not None:
            user_info = serializer.validated_data
            
            user_profile = Profile.objects.get(prouser = user)
            
            user_info = UserSerializer(user_profile,many=False).data
            
            
            return Response({
                "msg": "Successfully login",
                "user": user_info,
                "token": AuthToken.objects.create(user)[1]
            })
            

@api_view(['GET']) 
@permission_classes([IsAuthenticated])           
def ProfileApi(request):
    
    profile  = Profile.objects.get(prouser=request.user)
    serializer = UserSerializer(profile,many=False)
    
    return Response(serializer.data)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])   
def ProfileUpdate(request):
    profile  = Profile.objects.get(prouser=request.user)
    serializer = UserSerializer(instance=profile, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({
            "msg": "User data updated",
            "data": serializer.data,
        })
    else:
        return Response({
            "msg": "User data not updated"
        })


