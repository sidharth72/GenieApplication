from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

#router = DefaultRouter()
#router.register('auth', views.StudyMaterialServiceViewset,basename="StudyMaterial")
#router.register(r'users', views.UserViewSet,basename="users")

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('auth/register', views.UserCreate.as_view(), name='user_create'),
    #path('auth/login', views.LoginView.as_view(), name='login'),
    path('auth/login/', views.ObtainTokenPairWithColorView.as_view(), name='token_create'),
    path('auth/logout/', views.Logout.as_view(), name='logout'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]