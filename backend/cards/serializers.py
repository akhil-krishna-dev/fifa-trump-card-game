from rest_framework.serializers import ModelSerializer
from .models import PlayerCard

class PlayerCardSerializer(ModelSerializer):
    class Meta:
        model = PlayerCard
        fields = '__all__'
    