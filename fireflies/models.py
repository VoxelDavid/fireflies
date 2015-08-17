from django.db import models

from fireflies.managers import RandomManager

class Person(models.Model):
    name = models.CharField(max_length=50)
    # first_name = models.CharField(max_length=50)
    # last_name = models.CharField(max_length=50)
    # nickname = models.CharField(blank=True, max_length=50)
    website = models.URLField(blank=True)

    class Meta:
        verbose_name_plural = "people"

    def __str__(self):
        return self.name

class Image(models.Model):
    photographer = models.ForeignKey(Person, blank=True, null=True)
    name = models.CharField(max_length=50)
    source = models.URLField()
    objects = RandomManager()

    def __str__(self):
        return self.name

class Quote(models.Model):
    author = models.ForeignKey(Person, blank=True, null=True)
    content = models.TextField()
    source = models.URLField(blank=True)
    objects = RandomManager()

    def __str__(self):
        return self.content
