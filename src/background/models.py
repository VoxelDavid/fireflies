from django.db import models
from managers.random import RandomManager

class Photographer(models.Model):
    name = models.CharField(max_length=50)
    website = models.URLField(blank=True)

    def __str__(self):
        return self.name

class Image(models.Model):
    photographer = models.ForeignKey(Photographer, blank=True, null=True)
    name = models.CharField(max_length=50)
    source = models.URLField(blank=True)
    objects = RandomManager()

    def __str__(self):
        return self.name
