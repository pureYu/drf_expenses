# from rest_framework.routers import DefaultRouter
#
# from .views import CostView
#
#
# router = DefaultRouter()
# # router.register(r'costs', CostViewSet, basename='user')    # why 'user'????
# router.register(r'', CostView, basename='user')    # why 'user'????
#
# urlpatterns = router.urls

from django.urls import path

from .views import *

app_name = "expenses"
urlpatterns = [
    path('<int:pk>/', SingleExpenseView.as_view()),
    path('', ExpenseView.as_view()),
]
