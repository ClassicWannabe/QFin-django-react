from django.db import models
from django.utils.text import slugify

class News(models.Model):
    title = models.CharField(max_length=100)
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    picture = models.ImageField(upload_to='images/news') 

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-date']
        verbose_name_plural = 'news'

class Review(models.Model):
    author = models.CharField(max_length=50)
    approved = models.BooleanField(default=False)
    email = models.EmailField()
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.author + ': ' +self.email
    
    class Meta:
        ordering = ['-date']

class Feedback(models.Model):
    name = models.CharField(max_length=50, blank=True, null=True)
    agreement = models.BooleanField(default=False)
    email = models.EmailField()
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name + ': ' +self.email
    
    class Meta:
        ordering = ['-date']

class Service(models.Model):
    SERVICE_CHOICES = (
        ('B', 'Basic'),
        ('F', 'Finance')
    )
    
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)
    agreement = models.BooleanField(default=False)
    email = models.EmailField()
    text = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    service_type = models.CharField(max_length=2, choices=SERVICE_CHOICES)

    def __str__(self):
        return self.name + ': ' +self.email



