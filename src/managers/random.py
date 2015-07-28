import random

from django.db import models

class RandomManager(models.Manager):
    """Simple manager for getting random objects."""

    def get_random(self):
        objects = self.model.objects.all()
        random_object = random.choice(objects)
        return random_object
