# Generated by Django 5.0.3 on 2024-05-26 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_Forja', '0017_alter_ficha_falhas'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ficha',
            name='id',
        ),
        migrations.AddField(
            model_name='ficha',
            name='id_ficha',
            field=models.AutoField(default=0, primary_key=True, serialize=False),
        ),
    ]
