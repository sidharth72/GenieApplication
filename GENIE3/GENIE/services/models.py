from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class CreateStudyMaterialService(models.Model):
	query = models.CharField(default=" ",blank=True,max_length=1000)
	response_from_ai = models.TextField(blank=True, null=True)
	
	class Meta:
		verbose_name = "Material"
		verbose_name_plural = "Materials"

	def __str__(self):
		return self.query

class Notes(models.Model):
	title = models.CharField(null=True, max_length=225)
	desc = models.TextField(blank=True, null=True)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	data = models.ManyToManyField(CreateStudyMaterialService, blank=True, related_name="notesdata")

	class Meta:
		verbose_name = "Note"
		verbose_name_plural = "Notes"

class Tasks(models.Model):
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	task_query = models.CharField(max_length=225)
	task_desc = models.TextField()
	completed_response = models.TextField()

	class Meta:

		def __str__(self):
			return self.task_query


	




		
