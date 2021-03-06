from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    name = models.CharField(blank=True, max_length=255)
    surname = models.CharField(blank=True, max_length=255)

    REQUIRED_FIELDS = ['name', 'surname']

    def __str__(self):
        return '{} ({})'.format(self.username, self.email)