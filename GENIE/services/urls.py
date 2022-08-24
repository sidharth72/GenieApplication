from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .import views

router = DefaultRouter()
router.register('notesapi/update', views.StudyMaterialServiceViewset,basename="StudyMaterial")
router.register('notesapi/create', views.NotesViewset, basename="notes")

#router.register(r'users', views.UserViewSet,basename="users")

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]