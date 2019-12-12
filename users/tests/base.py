import os
import shutil

from django.conf import settings
from rest_framework.test import APITestCase

from django.contrib.auth.models import Group
from django.contrib.auth.hashers import make_password
from users.models import CustomUser


class BaseTestCase(APITestCase):
    fixtures = ['users_groups.json']
    """
    Base test case.
    """

    @classmethod
    def setUpClass(cls):
        super().setUpClass()

    @classmethod
    def tearDownClass(cls):
        if settings.TEST_SETTINGS and os.path.exists(settings.MEDIA_ROOT):
            shutil.rmtree(settings.MEDIA_ROOT)
        super().tearDownClass()

    def _create_user(self, username, name=None, surname=None, password=None, email=None):
        """
        Create user.
        :param username: Str
        :param name: Str
        :param surname: Str
        :param password: Str
        :param email: Str
        :return: User object
        """
        random_str = CustomUser.objects.make_random_password()
        if name is None:
            name = "Name"
        if password is None:
            password = random_str
        if surname is None:
            surname = password
        if email is None:
            email = "{}@email.com".format(username)
        user = CustomUser.objects.create(username=username, password=make_password(password), email=email, name=name, surname=surname)
        user.password = password
        return user

    def create_user_regular(self, username, name=None, surname=None, password=None, email=None):
        user = self._create_user(username, name, surname, password, email)
        user_group = Group.objects.get(name='regular_user')
        user.groups.add(user_group)
        return user

    def create_user_manager(self, username, name=None, surname=None, password=None, email=None):
        user = self._create_user(username, name, surname, password, email)
        user_group = Group.objects.get(name='user_manager')
        user.groups.add(user_group)
        return user

    def get_admin_user(self):
        user = CustomUser.objects.filter(groups__name='admin').first()
        return user

    def debug(self, item):
        print('\n\n^^^^^^^^^^^^^^^^^^^^^^^')
        print(item)
