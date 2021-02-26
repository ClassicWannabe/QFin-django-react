from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import News, Review, Feedback, Service
from .serializers import NewsSerializer, ReviewSerializer, FeedbackSerializer, ServiceSerializer

class NewsView(generics.ListAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

class HomeNewsView(generics.ListAPIView):
    queryset = News.objects.filter()[0:2]
    serializer_class = NewsSerializer

class GetPostView(generics.RetrieveAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    lookup_field = 'pk'

class ReviewView(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def get_queryset(self):
        return Review.objects.filter(approved=True)

class FeedbackView(generics.CreateAPIView):
    serializer_class = FeedbackSerializer

    def post(self, request, *args, **kwargs):
        agreement = request.data.get('agreement')

        if not agreement:
            return Response({"Cannot validate":"Did not agree"}, status=status.HTTP_417_EXPECTATION_FAILED)
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.data.get('email')
            name = serializer.data.get('name')
            text = serializer.data.get('text')
            agreement = serializer.data.get('agreement')
           
            feedback = Feedback.objects.create(email=email,name=name,text=text,agreement=agreement)

            return Response(self.serializer_class(feedback).data, status=status.HTTP_201_CREATED)

        return Response({"Bad request": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST)


class ServiceView(generics.CreateAPIView):
    serializer_class = ServiceSerializer

    def post(self, request, *args, **kwargs):
        agreement = request.data.get('agreement')
       
        if not agreement:
            return Response({"Cannot validate":"Did not agree"}, status=status.HTTP_417_EXPECTATION_FAILED)
        
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            email = serializer.data.get('email')
            name = serializer.data.get('name')
            text = serializer.data.get('text')
            phone = serializer.data.get('phone')
            service_type = serializer.data.get('service_type')
            agreement = serializer.data.get('agreement')
           
            service = Service.objects.create(email=email,name=name,text=text, phone=phone, service_type=service_type,agreement=agreement)

            return Response(self.serializer_class(service).data, status=status.HTTP_201_CREATED)
        
        return Response({"Bad request": "Invalid data..."}, status=status.HTTP_400_BAD_REQUEST)