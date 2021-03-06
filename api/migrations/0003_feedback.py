# Generated by Django 3.1.7 on 2021-02-25 13:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_review'),
    ]

    operations = [
        migrations.CreateModel(
            name='Feedback',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('agreement', models.BooleanField(default=False)),
                ('email', models.EmailField(max_length=254)),
                ('text', models.TextField()),
                ('date', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['-date'],
            },
        ),
    ]
