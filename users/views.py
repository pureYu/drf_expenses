from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import CustomUser
from .serializers import *
from .permissions import *


permission_groups = {
    'post': ['user_manager', 'admin'],  # can POST
    'put': ['user_manager', 'admin'],  # can PATCH
    'patch': ['user_manager', 'admin'],  # can PATCH
    # 'get': ['user_manager', 'admin', '_Public'], # retrieve can be accessed without credentials (GET 'site.com/api/foo/1')
    'get': ['user_manager', 'admin'], # retrieve can be accessed without credentials (GET 'site.com/api/foo/1')
    'delete': ['user_manager', 'admin'], # retrieve can be accessed without credentials (GET 'site.com/api/foo/1')
}

class UserListView(ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    # http_method_names = ['get', 'patch', 'delete', 'post']
    permission_classes = [IsAuthenticated, HasGroupPermission]
    permission_groups = permission_groups

    def get_queryset(self):
        filter = {}
        if IsAuthenticated and is_in_group(self.request.user, 'user_manager'):
            filter['groups__name__in'] = ['regular_user']
        queryset = CustomUser.objects.filter(**filter)
        return queryset.order_by('-id')

    def update(self, request, *args, **kwargs):
        partial = True # Here I change partial to True
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class SingleUserView(RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    http_method_names = ['get', 'patch', 'put', 'delete']
    permission_classes = [IsAuthenticated, HasGroupPermission]
    permission_groups = permission_groups

    def update(self, request, *args, **kwargs):
        partial = True # Here I change partial to True
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

