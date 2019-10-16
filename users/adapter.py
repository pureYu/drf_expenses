from allauth.account.adapter import DefaultAccountAdapter
from django.contrib.auth.models import Group

users_group = Group.objects.get(name='regular_user')


class CustomAccountAdapter(DefaultAccountAdapter):

    def save_user(self, request, user, form, commit=False):
        user = super().save_user(request, user, form, commit)
        data = form.cleaned_data
        user.name = data.get('name')
        user.surname = data.get('surname')
        # user.groups = [users_group]
        user.save()
        user.groups.add(users_group)
        return user