from rest_framework import serializers
from django.contrib.auth.models import Group
from . import models


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name',)

class UserSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)
    class Meta:
        model = models.CustomUser
        fields = ('id', 'username', 'email', 'name', 'surname', 'groups')