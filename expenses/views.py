from rest_framework.generics import get_object_or_404
from rest_framework.generics import ListCreateAPIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView

from rest_framework.permissions import IsAuthenticated
# from django.contrib.auth.models import User
from django.conf import settings
User = settings.AUTH_USER_MODEL

from .models import Expense
from .serializers import ExpenseSerializer
from users.models import CustomUser

from .filters import *
from django_filters import rest_framework as filters


class ExpenseView(ListCreateAPIView):
    """
    View for listing users' expenses and CRUD their expenses
    """
    permission_classes = (IsAuthenticated,)
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ExpenseFilter

    def get_queryset(self):
        # queryset = Expense.objects.filter(author=self.request.user)
        filter = {}
        if IsAuthenticated and self.request.user.id != 1:
            filter['author'] = self.request.user
        queryset = Expense.objects.filter(**filter)
        # return queryset.order_by('-date_spent', '-id')
        return queryset.order_by('-id')

    def perform_create(self, serializer):
        author = get_object_or_404(CustomUser, id=self.request.user.id)
        return serializer.save(author=author)


class SingleExpenseView(RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
