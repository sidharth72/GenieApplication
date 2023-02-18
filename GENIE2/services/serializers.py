from importlib.metadata import requires
from rest_framework import serializers
from .models import CreateStudyMaterialService, Notes
from drf_writable_nested.serializers import WritableNestedModelSerializer


class StudyMaterialServiceSerializer(serializers.ModelSerializer):

	class Meta:
		model = CreateStudyMaterialService
		fields = [
			"id",
			"query",
			"response_from_ai",

		]

class NoteSerializer(WritableNestedModelSerializer,serializers.ModelSerializer):
	data = StudyMaterialServiceSerializer()
	class Meta:
		model = Notes
		fields = ['id','user','title','desc','data']
		



