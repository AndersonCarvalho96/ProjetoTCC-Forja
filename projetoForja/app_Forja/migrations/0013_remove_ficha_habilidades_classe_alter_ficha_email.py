# Generated by Django 5.0.3 on 2024-05-26 02:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_Forja', '0012_delete_fichas_alter_ficha_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ficha',
            name='habilidades_classe',
        ),
        migrations.AlterField(
            model_name='ficha',
            name='email',
            field=models.EmailField(blank=True, max_length=254),
        ),
    ]
