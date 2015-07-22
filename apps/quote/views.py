from django.views.generic import TemplateView

from apps.quote.models import Quote

class QuoteView(TemplateView):
    template_name = "quote/quote.html"

    def get_context_data(self, **kwargs):
        context = super(QuoteView, self).get_context_data(**kwargs)
        context["random_quote"] = Quote.get_random()
        return context
