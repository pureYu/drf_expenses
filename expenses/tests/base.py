from datetime import datetime
from django.utils import timezone
import pytz

from django.conf import settings
from django.urls import reverse
from rest_framework.test import APITestCase

from django.contrib.auth.models import User, Group
from django.contrib.auth.hashers import make_password
from expenses.models import Expense
from users.tests.base import BaseTestCase


class BaseExpenseTestCase(BaseTestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()

    def setUp(self):
        self.regular_user_1 = self.create_user_regular(username="testuser_1", password="123TestUser1")
        self.regular_user_2 = self.create_user_regular(username="testuser_2", password="123TestUser2")

    def _create_single_expense(self, author=None, title=None, amount=None, date_spent=None):
        author = author if author else self.regular_user_1
        title = title if title else "Expense title"
        amount = amount if amount else 100
        date_spent = date_spent if date_spent else timezone.now()
        # TODO - check/convert date_spent to timezone aware
        expense = Expense.objects.create(author=author, title=title, amount=amount, date_spent=date_spent)
        return expense
