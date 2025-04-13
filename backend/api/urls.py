from django.urls import path
from cards.views import PlayerCardListView

urlpatterns = [
    path('cards', PlayerCardListView.as_view(), name='player-cards')
]