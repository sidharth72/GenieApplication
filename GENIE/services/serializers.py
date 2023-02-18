from importlib.metadata import requires
from rest_framework import serializers
from .models import Project, Document
from drf_writable_nested.serializers import WritableNestedModelSerializer


class DocumentSerializer(serializers.ModelSerializer):

	class Meta:
		model = Document
		fields = [
			"id",
			"doc_title",
			"description",
			"content"

		]

class ProjectSerializer(WritableNestedModelSerializer,serializers.ModelSerializer):
	document = DocumentSerializer(many=True)
	class Meta:
		model = Project
		fields = ['id','user','project_title','document']
		



