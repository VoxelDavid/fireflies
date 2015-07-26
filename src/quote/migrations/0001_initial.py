# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Quote',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('author', models.CharField(max_length=50, blank=True)),
                ('body', models.TextField()),
                ('source', models.URLField(blank=True)),
            ],
        ),
    ]
