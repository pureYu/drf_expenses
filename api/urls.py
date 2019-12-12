from django.urls import include, path


urlpatterns = [
    path('', include('users.urls')),
    path('users/', include('users.urls'), name='users'),
    path('expenses/', include('expenses.urls'), name='expenses'),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
]
