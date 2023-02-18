from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Document(models.Model):
	doc_title = models.CharField(max_length=300, blank=True)
	description = models.TextField(blank=True)
	content = models.TextField(blank=True)
	
	class Meta:
		verbose_name = "Document"
		verbose_name_plural = "Documents"

	def __str__(self):
		return self.doc_title

class Project(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	project_title = models.CharField(null=True, max_length=225)
	document = models.ManyToManyField(Document)

	class Meta:
		verbose_name = "Project"
		verbose_name_plural = "Projects"

	def __str__(self):
		return self.project_title
	




		
