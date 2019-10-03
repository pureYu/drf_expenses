from rest_framework.permissions import IsAuthenticated
from django_filters import rest_framework as filters
from .models import Expense


class ExpenseFilter(filters.FilterSet):

    class Meta:
        model = Expense
        # fields = ['title', 'author', 'date_spent']
        fields = ['author']

    title = filters.CharFilter(field_name='title', lookup_expr='icontains')
    # min_date = filters.DateRangeFilter(field_name="date_spent", lookup_expr='gte')

