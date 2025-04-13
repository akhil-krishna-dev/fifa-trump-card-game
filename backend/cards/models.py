from django.db import models


class PlayerCard(models.Model):
    name = models.CharField(max_length=150, null=False, blank=False)
    age = models.PositiveSmallIntegerField(null=False)
    image = models.URLField(blank=False, null=False)
    country = models.CharField(max_length=100, null=False, blank=False)

    # player stats --->>>
    matches_for_country = models.PositiveSmallIntegerField(null=False)
    matches_for_clubs = models.PositiveSmallIntegerField(null=False)
    
    goals_for_country = models.PositiveSmallIntegerField(null=False)
    goals_for_clubs = models.PositiveSmallIntegerField(null=False)

    assist_for_country = models.PositiveSmallIntegerField(null=False)
    assist_for_clubs = models.PositiveSmallIntegerField(null=False)

    world_cup_matches = models.PositiveSmallIntegerField(null=False)
    
    ballon_d_or = models.PositiveSmallIntegerField(null=False)

    def __str__(self):
        return f"{self.name} {self.country}"
    
