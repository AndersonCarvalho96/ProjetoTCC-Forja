# Generated by Django 5.0.3 on 2024-05-26 23:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_Forja', '0020_alter_ficha_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ficha',
            name='idade',
            field=models.PositiveIntegerField(blank=True, default=0),
        ),
    ]
