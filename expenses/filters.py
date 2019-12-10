from django_filters import rest_framework as filters
from django_filters import DateFilter
from datetime import timedelta
from .models import Expense


class TillFilter(DateFilter):

    def filter(self, qs, value):
        if value:
            value = value + timedelta(1)
        return super(TillFilter, self).filter(qs, value)


class ExpenseFilter(filters.FilterSet):

    class Meta:
        model = Expense
        # fields = ['title', 'author', 'date_spent']
        fields = ['author']

    title = filters.CharFilter(field_name='title', lookup_expr='icontains')
    min_date = filters.DateTimeFilter(field_name="date_spent", lookup_expr='gte')
    max_date = TillFilter(field_name="date_spent", lookup_expr="lt")
