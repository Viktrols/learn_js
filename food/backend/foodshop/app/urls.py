from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register('menus', views.MenusViewSet, basename='menus')

urlpatterns = [
     path('', include(router.urls)),
     path('contacts/', views.create_contact),
]