from rest_framework.generics import ListAPIView
from .serializers import PlayerCardSerializer
from .models import PlayerCard


class PlayerCardListView(ListAPIView):
    serializer_class = PlayerCardSerializer
    queryset = PlayerCard.objects.all()
     


