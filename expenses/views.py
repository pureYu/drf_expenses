from rest_framework.generics import get_object_or_404
from rest_framework.generics import ListCreateAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView, RetrieveAPIView
from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ValidationError
from django.conf import settings
from django.db.models import Sum
import datetime
import pytz
from django.utils.timezone import make_aware

User = settings.AUTH_USER_MODEL

from .models import Expense
from .serializers import ExpenseSerializer, SpentExpenseSumSerializer
from users.models import CustomUser
from users.permissions import *

from .filters import *
from django_filters import rest_framework as filters


permission_groups = {
    'post': ['regular_user', 'admin'],  # can POST
    'put': ['regular_user', 'admin'],  # can PATCH
    # 'get': ['regular_user', 'user_manager', 'admin', '_Public'], # retrieve can be accessed without credentials (GET 'site.com/api/foo/1')
    'get': ['regular_user', 'admin'], # retrieve can be accessed without credentials (GET 'site.com/api/foo/1')
    'delete': ['regular_user', 'admin'], # retrieve can be accessed without credentials (GET 'site.com/api/foo/1')
}

class ExpenseView(ListCreateAPIView):
    """
    View for listing users' expenses and CRUD their expenses
    """
    permission_classes = [IsAuthenticated, HasGroupPermission]
    permission_groups = permission_groups
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ExpenseFilter

    def get_queryset(self):
        # queryset = Expense.objects.filter(author=self.request.user)
        filter = {}
        if IsAuthenticated and is_in_group(self.request.user, 'regular_user'):
            filter['author'] = self.request.user
        queryset = Expense.objects.filter(**filter)
        # return queryset.order_by('-date_spent', '-id')
        return queryset.order_by('-id')

    def perform_create(self, serializer):
        author = get_object_or_404(CustomUser, id=self.request.user.id)
        return serializer.save(author=author)


class SingleExpenseView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, HasGroupPermission]
    permission_groups = permission_groups
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer


class SpentExpenseSumView(RetrieveAPIView):
    permission_classes = [IsAuthenticated, HasGroupPermission]
    permission_groups = permission_groups
    http_method_names = ['get']

    def get(self, request):
        date_spent = self.request.query_params.get('date_spent', None)

        serializer = SpentExpenseSumSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)

        if date_spent is None:
            date_spent =  datetime.date.today()

        sum_value = Expense.objects.filter(author=request.user, date_spent__date=date_spent) \
                                    .aggregate(Sum('amount')).get('amount__sum')
        content = {'date': date_spent, 'sum_total': sum_value}
        return Response(content)

