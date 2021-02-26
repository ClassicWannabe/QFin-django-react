from django.contrib import admin
from .models import News, Review, Feedback, Service


admin.site.register(News)
admin.site.register(Review)
admin.site.register(Feedback)
admin.site.register(Service)