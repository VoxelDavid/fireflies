from django.contrib import admin

from fireflies.models import Person, Image, Quote

models = [ Person, Image, Quote ]

admin.site.register(models)
