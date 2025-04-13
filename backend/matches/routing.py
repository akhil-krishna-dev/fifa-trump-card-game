from django.urls import re_path
from .consumer import MatchConsumer

websocket_urlpatterns = [
    re_path('ws/match', MatchConsumer.as_asgi(), name='match')
]