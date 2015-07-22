from django.conf.urls import include, url

from apps.quote.views import QuoteView

urlpatterns = [
    url(r"^$", QuoteView.as_view())
]
