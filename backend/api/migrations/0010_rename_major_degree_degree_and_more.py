# Generated by Django 5.1 on 2024-09-15 11:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_degree_delete_term'),
    ]

    operations = [
        migrations.RenameField(
            model_name='degree',
            old_name='major',
            new_name='degree',
        ),
        migrations.RenameField(
            model_name='degree',
            old_name='minor',
            new_name='program',
        ),
    ]
