# Generated by Django 5.0.3 on 2024-05-22 23:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app_Forja', '0011_alter_ficha_salvaguardas_alter_ficha_sg_morte'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Fichas',
        ),
        migrations.AlterField(
            model_name='ficha',
            name='email',
            field=models.EmailField(max_length=254),
        ),
    ]
