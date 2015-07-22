import random

from django.db import models

class Quote(models.Model):
    author = models.CharField(blank=True, max_length=50)
    content = models.TextField()
    source = models.URLField(blank=True)

    def __str__(self):
        return self.content

    def get_random():
        """Gets a random quote from the database."""
        quotes = Quote.objects.all()
        random_quote = random.choice(quotes)
        return random_quote
