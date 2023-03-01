from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('game', views.game, name='game'),
    path('gamelvl2', views.gamelvl2, name='gamelvl2'),
    
]