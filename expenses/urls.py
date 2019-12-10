from django.urls import path

from .views import *

app_name = "expenses"
urlpatterns = [
    path('<int:pk>/', SingleExpenseView.as_view()),
    path('spent-sum/', SpentExpenseSumView.as_view()),
    path('', ExpenseView.as_view()),
]
