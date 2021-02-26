from django.urls import path
from .views import NewsView, ReviewView, FeedbackView, ServiceView, HomeNewsView, GetPostView

urlpatterns = [
    path('news-list/', NewsView.as_view()),
    path('home-news-list/', HomeNewsView.as_view()),
    path('get-post/<int:pk>', GetPostView.as_view()),
    path('reviews-create-list/', ReviewView.as_view()),
    path('feedback/', FeedbackView.as_view()),
    path('service/', ServiceView.as_view()),
]