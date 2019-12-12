from django.urls import path

from .views import *

app_name = "expenses"
urlpatterns = [
    path('<int:pk>/', SingleExpenseView.as_view(), name='detail'),
    path('spent-sum/', SpentExpenseSumView.as_view(), name='spent_sum'),
    path('', ExpenseView.as_view(), name='list'),
]
