from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # login
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),       # refresh token



    path('welcome/', views.WelcomeView.as_view(), name='welcome'),

]

from rest_framework_simplejwt.views import TokenBlacklistView

urlpatterns += [
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist'),
]