from django.urls import path
from .views import GetAllUsersView, RegisterView, LoginView, UserDetailView, UserProfileUpdateView, UserProfileView, VerifyUserView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='jwt_login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('verify-user/', VerifyUserView.as_view(), name='verify-user'),
    path('all-users/', GetAllUsersView.as_view(), name='get_all_users'),
    path('user/<int:pk>/', UserDetailView.as_view(), name='user-detail'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('profile/update/', UserProfileUpdateView.as_view(), name='user-profile-update'),
    
]
