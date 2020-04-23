# Generated by Django 2.2.10 on 2020-04-22 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mi_tienda', '0002_pedido'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='imagen',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='producto',
            name='nombre',
            field=models.CharField(default='', max_length=50),
        ),
        migrations.AlterField(
            model_name='producto',
            name='precio',
            field=models.FloatField(default=0),
        ),
    ]