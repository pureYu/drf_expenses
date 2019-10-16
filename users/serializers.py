from rest_framework import serializers
from django.contrib.auth.models import Group
from . import models

from allauth.account import app_settings as allauth_settings
from allauth.utils import email_address_exists
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_auth.registration.serializers import RegisterSerializer


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name',)

class UserSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)
    class Meta:
        model = models.CustomUser
        fields = ('id', 'username', 'email', 'name', 'surname', 'groups')
        read_only_fields = ('email', 'username', 'groups')


class CustomRegisterSerializer(RegisterSerializer):
    password1 = serializers.CharField(required=True, write_only=True)
    password2 = serializers.CharField(required=True, write_only=True)
    name = serializers.CharField(required=True, write_only=True)
    surname = serializers.CharField(required=True, write_only=True)

    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError(("The two password fields didn't match."))
        return data

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['password1'] = self.validated_data.get('password1', '')
        data_dict['password2'] = self.validated_data.get('password2', '')
        data_dict['name'] = self.validated_data.get('name', '')
        data_dict['surname'] = self.validated_data.get('surname', '')
        return data_dict

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(request, user, self)
        # self.custom_signup(request, user)
        setup_user_email(request, user, [])
        # user.name = self.cleaned_data.get('name')
        # user.surname = self.cleaned_data.get('surname')
        user.save()
        return user