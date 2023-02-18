from pydoc import Doc
from django.contrib import admin
from.models import Project, Document

# Register your models here.

admin.site.register(Document)
admin.site.register(Project)
