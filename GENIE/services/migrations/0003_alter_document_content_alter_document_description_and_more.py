# Generated by Django 4.0.5 on 2022-09-21 11:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0002_document_project_remove_notes_data_remove_notes_user_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='document',
            name='content',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='document',
            name='description',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='document',
            name='doc_title',
            field=models.CharField(blank=True, max_length=300),
        ),
    ]