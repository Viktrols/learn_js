import time

from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework import status, mixins, viewsets

from .serializers import ContactSerializer, MenuSerializer
from .models import Menu


class ListViewSet(mixins.ListModelMixin, viewsets.GenericViewSet):
    pass


class MenusViewSet(ListViewSet):
    queryset = Menu.objects.all().order_by('-price')
    serializer_class = MenuSerializer
    permission_classes = [permissions.AllowAny]


@api_view(['POST'])
def create_contact(request):
    if request.method == 'POST':
        time.sleep(5)
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

