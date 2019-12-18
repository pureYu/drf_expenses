from django.http import QueryDict
from rest_framework import serializers
from django.contrib.auth.models import Group
from .models import CustomUser

from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_auth.registration.serializers import RegisterSerializer


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name',)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'username', 'email', 'name', 'surname', 'groups', 'password1', 'password2')
        read_only_fields = ('email', 'username', 'groups')
        extra_kwargs = {
            'password1': {'write_only': True},
            'password2': {'write_only': True}
        }

    username = serializers.CharField(required=True, max_length=20, min_length=4)
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(required=True, write_only=True)
    password2 = serializers.CharField(required=True, write_only=True)

    groups = GroupSerializer(many=True, read_only=True)


    def validate_username(self, username):
        shallow = False
        initial_username = getattr(self.instance, 'username', None)
        if self.instance is not None and initial_username == username \
                    and self.context['request'].method in ['PATCH', 'PUT']:
            shallow = True
        return get_adapter().clean_username(username, shallow)

    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError(("The two password fields didn't match."))
        return data

    def get_cleaned_data(self):
        data_dict = {
            'username': self.validated_data.get('username', ''),
            'email': self.validated_data.get('email', '')
        }
        data_dict['password1'] = self.validated_data.get('password1', '')
        data_dict['password2'] = self.validated_data.get('password2', '')
        data_dict['name'] = self.validated_data.get('name', '')
        data_dict['surname'] = self.validated_data.get('surname', '')
        return data_dict

    def create(self, validated_data):
        validated_data['password'] = validated_data.pop('password1')
        validated_data.pop('password2')
        adapter = get_adapter()
        user = adapter.new_user(validated_data)
        self.cleaned_data = self.get_cleaned_data()
        adapter.save_user(validated_data, user, self)
        setup_user_email(self.context['request'], user, [])
        user.save()
        return user


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
