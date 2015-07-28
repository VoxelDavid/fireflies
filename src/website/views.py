from django.views.generic import TemplateView

from quote.models import Quote
from background.models import Image

class IndexView(TemplateView):
    template_name = "website/index.html"

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        context["random_quote"] = Quote.objects.get_random()
        context["random_image"] = Image.objects.get_random()
        return context
