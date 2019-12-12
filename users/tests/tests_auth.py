from django.urls import reverse
from rest_framework.authtoken.models import Token

from users.tests.base import BaseTestCase


class UserRegistrationAPIViewTestCase(BaseTestCase):
    url = reverse("rest_register")

    def test_invalid_password(self):
        user_data = {
            "username": "testuser",
            "email": "test@testuser.com",
            "password1": "Wqyu123asdYYY",
            "password2": "INVALID_PASSWORD",
            "name": "testuser",
            "surname": "testuser",
        }
        response = self.client.post(self.url, user_data)
        self.assertEqual(400, response.status_code)

    def test_user_registration(self):
        user_data = {
            "username": "testuser",
            "email": "test@testuser.com",
            "password1": "Wqyu123asdYYY",
            "password2": "Wqyu123asdYYY",
            "name": "testuser",
            "surname": "testuser",
        }
        response = self.client.post(self.url, user_data)
        self.assertEqual(201, response.status_code)
        self.assertTrue("key" in dict(response.data).keys())

    def test_unique_username_validation(self):
        user_data_1 = {
            "username": "testuser",
            "email": "test@testuser.com",
            "password1": "Wqyu123asdYYY",
            "password2": "Wqyu123asdYYY",
            "name": "testuser",
            "surname": "testuser",
        }
        response = self.client.post(self.url, user_data_1)
        self.assertEqual(201, response.status_code)

        user_data_2 = {
            "username": "testuser",
            "email": "test_22@testuser.com",
            "password1": "Wqyu123asdYYY22",
            "password2": "Wqyu123asdYYY22",
            "name": "testuser_22",
            "surname": "testuser_22",
        }
        response = self.client.post(self.url, user_data_2)
        self.assertEqual(400, response.status_code)


class UserLoginAPIViewTestCase(BaseTestCase):
    login_url = reverse("rest_login")

    def setUp(self):
        self.user = self.create_user_regular(username="testuser", password="123TestUser")
        self.token = Token.objects.create(user=self.user)

    def _api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_authentication_without_password(self):
        response = self.client.post(self.login_url, {"username": self.user.username})
        self.assertEqual(400, response.status_code)

    def test_authentication_with_wrong_password(self):
        response = self.client.post(self.login_url, {"username": self.user.username, "password": "INVALID_PASSWORD"})
        self.assertEqual(400, response.status_code)

    def test_authentication_with_valid_data(self):
        response = self.client.post(self.login_url, {"username": self.user.username, "password": self.user.password})
        self.assertEqual(200, response.status_code)
        self.assertTrue("key" in dict(response.data).keys())

    def test_authentication_user_information(self):
        details_url = reverse('rest_user_details')
        response = self.client.get(details_url)
        self.assertEqual(401, response.status_code)

        self._api_authentication()
        response = self.client.get(details_url)
        self.assertEqual(200, response.status_code)
        self.assertEqual(self.user.username, response.data["username"])


