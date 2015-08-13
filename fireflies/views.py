from django.views.generic import TemplateView

from fireflies.models import Image, Quote

class IndexView(TemplateView):
    template_name = "fireflies/index.html"

    def get_context_data(self, **kwargs):
        context = super(IndexView, self).get_context_data(**kwargs)
        context["random_quote"] = Quote.objects.get_random()
        context["random_image"] = Image.objects.get_random()
        return context
