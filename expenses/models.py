from django.db import models
from django.utils import timezone
from django.urls import reverse
# from django.contrib.auth.models import User
from django.conf import settings
User = settings.AUTH_USER_MODEL


class Expense(models.Model):
    title = models.CharField(max_length=100, null=False)
    amount = models.DecimalField(null=False, max_digits=6, decimal_places=2)
    date_spent = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return "\"{}\" - {:.2f} - {:%Y-%m-%d %H:%M} / {}".format(self.title, self.amount, self.date_spent, self.author.username )

    # def get_absolute_url(self):
    #     return reverse('cost-detail', kwargs={'pk': self.pk})
