from rest_framework import serializers
from .models import News, Review, Feedback, Service

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ('pk','title','text','date','picture')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('pk','author', 'email', 'text','date')

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ('name', 'email', 'text', 'agreement')

class ServiceSerializer(serializers.ModelSerializer):
    service_type = serializers.ChoiceField(choices=Service.SERVICE_CHOICES)
    class Meta:
        model = Service
        fields = ('name', 'email', 'text', 'agreement', 'phone', 'service_type')