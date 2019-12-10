from rest_framework import serializers

from .models import Expense


class ExpenseSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')
    date_spent = serializers.DateTimeField(format='%Y-%m-%d %H:%M')
    # date_spent = serializers.DateTimeField(format='%Y-%m-%d')
    # time_spent = serializers.DateTimeField(format='%H:%M', source='date_spent')

    class Meta:
        model = Expense
        fields = ('id', 'title', 'amount', 'date_spent', 'author_id', 'author')

class SpentExpenseSumSerializer(serializers.Serializer):
    date_spent = serializers.DateField(required=False)

