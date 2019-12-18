from django.contrib.auth.models import AbstractUser, User
from django.db import models
from django.contrib.auth.validators import ASCIIUsernameValidator

class CustomUser(AbstractUser):
    name = models.CharField(blank=True, max_length=255)
    surname = models.CharField(blank=True, max_length=255)

    REQUIRED_FIELDS = ['name', 'surname']
    # USERNAME_FIELD = 'username'
    # username_validator = ASCIIUsernameValidator()

    def __str__(self):
        return '{} ({})'.format(self.username, self.email)
