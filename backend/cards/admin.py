from django.contrib import admin
from .models import PlayerCard


class PlayerCardAdmin(admin.ModelAdmin):
    list_display = ['name','image']
    list_editable = ['image']

admin.site.register(PlayerCard, PlayerCardAdmin)