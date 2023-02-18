from django.shortcuts import render
from rest_framework.response import Response
from .serilalizers import UserSerializer, LoginUserSerializer
from rest_framework import generics
from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework import status
from django.contrib.auth import login
#from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework import permissions
from rest_framework.authtoken.models import Token
from django.contrib.auth import logout
from .serilalizers import MyTokenObtainPairSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions
from rest_framework_simplejwt.tokens import RefreshToken


class ObtainTokenPairWithColorView(TokenObtainPairView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer


# Create your views here.

class UserCreate2(generics.CreateAPIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = MyTokenObtainPairSerializer


class UserCreate(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login View
class LoginView(APIView):
    permission_classes = ()
    serializer_class = LoginUserSerializer

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        try:
            # IF token exists then return token
            if user:
                return Response({'token':user.auth_token.key})
            elif not user.auth_token.key:
                return Response({"error": "Wrong credentials"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            # If token not exist create new token and return it during login
            token = Token.objects.create(user=user)
            return Response({'token':token.key})


# Logut view
class Logout(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
        except:
            return Response("Problem occured",status=status.HTTP_400_BAD_REQUEST)
        return Response("Success")


    