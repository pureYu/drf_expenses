from django.contrib.auth.models import User, Group
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions

# https://gist.github.com/leonardo-/b348e6c607b91ddef586e7262481dfcc
def is_in_group(user, group_name):
    try:
        return Group.objects.get(name=group_name).user_set.filter(id=user.id).exists()
    except Group.DoesNotExist:
        return False


class HasGroupPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if IsAuthenticated and request.user.id == 1:
            return True

        action = request.method.lower()
        required_groups = view.permission_groups.get(action)
        if required_groups == None:
            return False
        elif '_Public' in required_groups:
            return True
        else:
            return any([is_in_group(request.user, group_name) for group_name in required_groups])


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        return (request.user and request.user.is_superuser) or (
            obj.user == request.user)


class IsAdminUserOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admin users to edit it. Or readonly for non-admin
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user and request.user.is_staff


class IsSameUserAllowEditionOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """
    def has_permission(self, request, view):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # grant permission only if the method is the PUT method
        return request.user.is_staff or request.method == 'PUT'

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        return request.user.is_staff or (request.method == 'PUT' and
                                         obj.id == request.user.id)


class IsRegularUser(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.groups.filter(name='regular_user'):
            return True
        return False

class IsUserManager(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user and request.user.groups.filter(name='user_manager'):
            return True
        return False

class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if (request.user and request.user.groups.filter(name='admin')) or request.user.id == 1:
            return True
        return False

