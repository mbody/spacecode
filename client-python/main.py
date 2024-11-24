from spacecode import (
    Game,
    Color
)
import math
import time
import random



game = Game(host="localhost", username="Mathurin", color=Color.getRandomColor())

me = game.currentPlayer
me.x = 300
me.y = 500

def autoPilot():
    dt = time.time()*10 % 400 
    if(dt>300):
        me.goForward()
        me.turnLeft()    
    elif (dt>200):
        me.goForward()
        me.turnLeft()    
    elif (dt> 100):
        me.goForward()
    else:
        me.goBackward()
        me.turnLeft()    
    if random.randint(0, 100) > 95:
        me.shoot()
        me.turnRight()

def manualControl():
    me.x = 100 + math.cos(time.time()) * 200 
    me.y = 300 + math.sin(time.time()) * 200
    me.rotation = math.sin(time.time())*180

while True:
    autoPilot()
    #manualControl()

    if random.randint(0, 100) > 95:
        me.shoot()
    
    game.update()