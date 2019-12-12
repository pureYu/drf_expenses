from django.urls import reverse
from datetime import date, datetime, timedelta
from django.utils import timezone
import pytz

from rest_framework.authtoken.models import Token
from expenses.tests.base import BaseExpenseTestCase


class ExpensesListCRUDUnauthorizedTestCase(BaseExpenseTestCase):
    url = reverse("expenses:list")

    def test_crud_unauthorized(self):
        # TODO
        pass



class ExpensesListCreateAPIViewTestCase(BaseExpenseTestCase):
    url = reverse("expenses:list")

    def setUp(self):
        super().setUp()
        self.user = self.create_user_regular(username="testuser", password="123TestUser")
        self.token = Token.objects.create(user=self.user)
        self._api_authentication()

    def _api_authentication(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_create_expense_item(self):
        data = {"title": "Expense 1", "amount": 12.00, "date_spent": "2019-12-12 12:00"}
        response = self.client.post(self.url, data)
        self.assertEqual(201, response.status_code)

    def test_create_expense_inconsistent_data(self):
        data = {"title": "Expense name"}
        response = self.client.post(self.url, data)
        self.assertEqual(400, response.status_code)

        data = {"title": "Expense name", "amount": 12.00}
        response = self.client.post(self.url, data)
        self.assertEqual(400, response.status_code)

        data = {"title": 12.00, "amount": "abc"}
        response = self.client.post(self.url, data)
        self.assertEqual(400, response.status_code)

        data = {"title": "Expense name", "amount": 123, "date_spent": "2019"}
        response = self.client.post(self.url, data)
        self.assertEqual(400, response.status_code)

    def test_create_expense_item_wo_credentials(self):
        self.client.logout()
        data = {"title": "Expense 1", "amount": 12.00, "date_spent": "2019-12-12 12:00"}
        response = self.client.post(self.url, data)
        self.assertEqual(401, response.status_code)

    def test_user_expenses_list(self):
        self._create_single_expense(author=self.user)
        self._create_single_expense(author=self.user)
        self._create_single_expense(author=self.user)
        EXPECTED_RESULT = 3
        response = self.client.get(self.url)
        self.assertEqual(200, response.status_code)
        self.assertEqual(response.data["count"], EXPECTED_RESULT)

    def test_user_expenses_list_filtered(self):
        yesterday = timezone.now() - timedelta(days=1)
        self._create_single_expense(author=self.user, title="Apples", date_spent=yesterday)
        self._create_single_expense(author=self.user, title="Oranges", date_spent=yesterday)
        self._create_single_expense(author=self.user, title="Coffee", date_spent=timezone.now())
        EXPECTED_RESULT_1 = 2
        EXPECTED_RESULT_2 = 1
        yesterday = (date.today() - timedelta(days=1))
        response = self.client.get(self.url, {"min_date": yesterday, "max_date": yesterday})
        self.assertEqual(200, response.status_code)
        self.assertEqual(response.data["count"], EXPECTED_RESULT_1)
        response = self.client.get(self.url, {"title": "Coffee"})
        self.assertEqual(200, response.status_code)
        self.assertEqual(response.data["count"], EXPECTED_RESULT_2)

    def test_user_expenses_list_for_usermanager(self):
        user_manager = self.create_user_manager(username="usermanager")
        self.token = Token.objects.create(user=user_manager)
        self._api_authentication()
        response = self.client.get(self.url)
        self.assertEqual(403, response.status_code)

    def test_user_expenses_list_for_admin(self):
        self._create_single_expense(author=self.regular_user_1)
        self._create_single_expense(author=self.regular_user_2)
        EXPECTED_RESULT = 2
        admin = self.get_admin_user()
        self.token = Token.objects.create(user=admin)
        self._api_authentication()
        response = self.client.get(self.url)
        self.assertEqual(200, response.status_code)
        self.assertEqual(response.data["count"], EXPECTED_RESULT)

    def test_create_expense_item_by_usermanager(self):
        user_manager = self.create_user_manager(username="usermanager")
        self.token = Token.objects.create(user=user_manager)
        self._api_authentication()
        data = {"title": "Expense 1", "amount": 12.00, "date_spent": "2019-12-12 12:00"}
        response = self.client.post(self.url, data)
        self.assertEqual(403, response.status_code)

    def test_create_expense_item_by_admin(self):
        admin = self.get_admin_user()
        self.token = Token.objects.create(user=admin)
        self._api_authentication()
        data = {"title": "Expense 1", "amount": 12.00, "date_spent": "2019-12-12 12:00"}
        response = self.client.post(self.url, data)
        self.assertEqual(201, response.status_code)



        # self.debug(response.status_code)
        # self.debug(response.data)
        # self.debug(response)



    def test_create_expense_item_wrong_credentials(self):
        # TODO
        pass