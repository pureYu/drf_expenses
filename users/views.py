from rest_framework.generics import ListAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from .models import CustomUser
from .serializers import *
from .permissions import *


permission_groups = {
    'post': ['user_manager', 'admin'],  # can POST
    'put': ['user_manager', 'admin'],  # can PATCH
    # 'get': ['user_manager', 'admin', '_Public'], # retrieve can be accessed without credentials (GET 'site.com/api/foo/1')
    'get': ['user_manager', 'admin'], # retrieve can be accessed without credentials (GET 'site.com/api/foo/1')
    'delete': ['user_manager', 'admin'], # retrieve can be accessed without credentials (GET 'site.com/api/foo/1')
}

class UserListView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, HasGroupPermission]
    permission_groups = permission_groups

    def get_queryset(self):
        filter = {}
        if IsAuthenticated and is_in_group(self.request.user, 'user_manager'):
            filter['groups__name__in'] = ['regular_user']
        queryset = CustomUser.objects.filter(**filter)
        return queryset.order_by('-id')


class SingleUserView(RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, HasGroupPermission]
    permission_groups = permission_groups
