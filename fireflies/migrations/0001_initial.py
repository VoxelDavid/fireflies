# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, auto_created=True, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('source', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, auto_created=True, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('website', models.URLField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Quote',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, auto_created=True, verbose_name='ID')),
                ('content', models.TextField()),
                ('source', models.URLField(blank=True)),
                ('author', models.ForeignKey(null=True, blank=True, to='fireflies.Person')),
            ],
        ),
        migrations.AddField(
            model_name='image',
            name='photographer',
            field=models.ForeignKey(null=True, blank=True, to='fireflies.Person'),
        ),
    ]
