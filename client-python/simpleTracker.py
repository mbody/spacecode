from spacecode import (
    Game,
    Color
)
import math
import time
import random



game = Game(host="localhost", username="Tracker", color=Color.getRandomColor())

me = game.currentPlayer
me.x = 300
me.y = 500

while True:
    
    if len(game.enemies) > 0:
        me.turnTowards(game.enemies[0])
        me.moveForward()
        me.shoot()
    else :
        me.turnRight()
    
    game.update()