# Generated by Django 3.1.7 on 2021-02-25 15:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20210225_2026'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='review',
            options={'ordering': ['-date']},
        ),
    ]
