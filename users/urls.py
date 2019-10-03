from django.urls import include, path

from .views import *

urlpatterns = [
    path('<int:pk>/', SingleUserView.as_view()),
    path('', UserListView.as_view()),
]