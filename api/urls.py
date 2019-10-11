from django.urls import include, path


urlpatterns = [
    path('', include('users.urls')),
    path('users/', include('users.urls')),
    path('expenses/', include('expenses.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
]
