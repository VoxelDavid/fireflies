from django.db import models
from managers.random import RandomManager

class Author(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class Quote(models.Model):
    author = models.ForeignKey(Author, blank=True, null=True)
    content = models.TextField()
    source = models.URLField(blank=True)
    objects = RandomManager()

    def __str__(self):
        return self.content
