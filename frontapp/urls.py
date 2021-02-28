from django.urls import path
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('home/', TemplateView.as_view(template_name='index.html')),
    path('contacts/', TemplateView.as_view(template_name='index.html')),
    path('reviews/', TemplateView.as_view(template_name='index.html')),
    path('services/basic', TemplateView.as_view(template_name='index.html')),
    path('news/', TemplateView.as_view(template_name='index.html')),
    path('news/<int:pk>', TemplateView.as_view(template_name='index.html')),
]