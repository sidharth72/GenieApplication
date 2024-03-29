from dataclasses import fields
from wsgiref import validate
from django.contrib.auth.models import User
from requests import Response
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.core import exceptions
import django.contrib.auth.password_validation as validators
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from.models import Profile

# User Login
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
  
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        token['username'] = user.username
        return token


# User Registration
class UserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    email = serializers.EmailField(
        required=True
    )
    username = serializers.CharField()
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = User
        fields = ('first_name','last_name','email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  # as long as the fields are the same, we can just use this
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is not available")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("The email is not available")
        return value




class UserSerializer2(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','email','password')
        extra_kwargs = {'password': {'write_only': True}}


    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email already exists!.")
        return value

    
    def create(self, validated_data):
        #password = validated_data['password']
        user = User(
        username=validated_data['username'],
        email = validated_data['email']
        ) 
        password = validated_data['password']
        user.set_password(password)    
        user.save()
        token = super(MyToken)
        return user

class LoginUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','password')
        extra_kwargs = {'password': {'write_only': True}}


    def login(self, validate_data):
        user = User(username=validate_data['username'],password=validate_data['password'])
        Token.objects.create(user=user)
        return user 


class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = [
            "id",
            "user",
            "phone_number",
            "country",
            "state"

        ]
