from cgitb import lookup
from tkinter.tix import Tree
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import CreateStudyMaterialService
from .serializers import NoteSerializer, StudyMaterialServiceSerializer
from rest_framework import status
from NotesService.studynotescreator import create_study_notes
from copy import deepcopy
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.exceptions import PermissionDenied
#from .pagination import CustomPagination
from rest_framework.views import APIView
from .models import Notes
import re

#CLEANER = re.compile('<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6});')


class NotesViewset(viewsets.ModelViewSet):

    queryset = Notes.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "pk"

    def list(self, request, *args, **kwargs):
        data = Notes.objects.filter(user=request.user)
        serializer = NoteSerializer(data, many=True)
        return Response(serializer.data)

    def create(self, request, format=None):
        data = deepcopy(request.data)
        data['user'] = request.user.id
        serializer = NoteSerializer(data = data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, format=None, *args, **kwargs):
        pk = self.kwargs.get('pk')
        instance = Notes.objects.get(pk=pk)
        data = deepcopy(request.data)
        data['user'] = request.user.id
        serializer = NoteSerializer(instance=instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudyMaterialServiceViewset(viewsets.ModelViewSet):

    queryset = CreateStudyMaterialService.objects.all()
    serializer_class = StudyMaterialServiceSerializer
    permission_classes = [IsAuthenticated]
    #lookup_field = 'pk'
    #pagination_class = CustomPagination

    #GET
    def list(self, request, *args, **kwargs):
        data = CreateStudyMaterialService.objects.all()
        #if request.user == data.user:
        serializer = StudyMaterialServiceSerializer(data, many=True)
        return Response(serializer.data)
        #else:
         #   Response("You must login")

    #POST
    @csrf_exempt
    def create(self, request, format=None):
        try:
            req_without_start = request.data['query']
            req_with_start = request.data['response_from_ai']
            #req_with_start = re.sub(CLEANER, '', req_with_start)
            resp = create_study_notes(req_without_start,req_with_start) # Response from AI
            data = deepcopy(request.data) # converting to mutable object
            data['response_from_ai'] = resp
            #data['user'] = request.user.id
            serializer = StudyMaterialServiceSerializer(data=data)
            #Response(resp,  status=status.HTTP_201_CREATED)
            if serializer.is_valid():
                serializer.save()#user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response("Connection Error! Please try again!")

    #PUT
    def update(self, request, format=None, *args, **kwargs):
        
        pk = self.kwargs.get('pk')
        instance = CreateStudyMaterialService.objects.get(pk=pk)
        #get_object_or_404(CreateStudyMaterialService.objects.filter(user=request.user))
         # Cheking if the object user is the request user
        req_without_start = request.data['query']
        req_with_start = request.data['response_from_ai']
        resp = create_study_notes(req_without_start,req_with_start) # Response from AI
        data = deepcopy(request.data) # converting to mutable object
        data['response_from_ai'] = resp
        #data['user'] = request.user.id
        #CreateStudyMaterialService.objects.filter(user=request.user)
        
        serializer = self.serializer_class(instance=instance, data=data, partial=True) 
            #StudyMaterialServiceSerializer(instance=instance, data=data, many=True)
            
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            #return Response("An Error Occured! Please Check your Connection")


    # DELETE
    def destroy(self,request,pk, format=None):
        instance = get_object_or_404(CreateStudyMaterialService.objects.all(), pk=pk)
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



    



