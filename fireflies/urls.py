from django.conf.urls import include, url

from fireflies.views import IndexView

urlpatterns = [
    url(r"", IndexView.as_view())
]
