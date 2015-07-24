import random

from django.db import models

class Photographer(models.Model):
    name = models.CharField(max_length=50)
    website = models.URLField(blank=True)

    def __str__(self):
        return self.name

class Image(models.Model):
    photographer = models.ForeignKey(Photographer, blank=True, null=True)
    name = models.CharField(max_length=50)
    source = models.URLField(blank=True)

    def __str__(self):
        return self.name

    def get_random():
        """Gets a random image from the database."""
        images = Image.objects.all()
        random_image = random.choice(images)
        return random_image
