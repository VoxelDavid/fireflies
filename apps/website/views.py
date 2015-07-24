from django.views.generic import TemplateView

from apps.quote.models import Quote
from apps.background.models import Image

class IndexView(TemplateView):
    template_name = "website/index.html"

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        context["random_quote"] = Quote.get_random()
        context["random_image"] = Image.get_random()
        return context
