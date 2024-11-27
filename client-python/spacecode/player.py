import json
from .network import sio



class Player:
    def __init__(self, x=0, y=0, rotation=0):
        self.__x = x
        self.__y = y
        self.__rotation = rotation
        self.lastShootTimestamp = 0
    
    def shoot(self):
        sio.emit("shoot")

    def goForward(self):
        self.__emitKeydown("ArrowUp")

    def goBackward(self):
        self.__emitKeydown("ArrowDown")

    def turnLeft(self):
        self.__emitKeydown("ArrowLeft")

    def turnRight(self):
        self.__emitKeydown("ArrowRight")        

    def toJSON(self):
        return self.__dict__
    
    def __emitKeydown(self, keycode):
        sio.emit("keydown", {"keycode": keycode})

    ############################## Getters and setters
    @property
    def x(self) -> float:
        return self.__x
    
    @x.setter
    def x(self, v: float | int):
        if not (isinstance(v, float) or isinstance(v, int)):
            raise TypeError("Expected float or int, got " + type(v).__name__)
        self.__x = float(v)
        sio.emit("updatePlayerX", self.__x)

    @property
    def y(self) -> float:
        return self.__y
    
    @y.setter
    def y(self, v: float | int):
        if not (isinstance(v, float) or isinstance(v, int)):
            raise TypeError("Expected float or int, got " + type(v).__name__)
        self.__y = float(v)
        sio.emit("updatePlayerY", self.__y)

    @property
    def rotation(self) -> float:
        return self.__rotation
    
    @rotation.setter
    def rotation(self, v: float | int):
        if not (isinstance(v, float) or isinstance(v, int)):
            raise TypeError("Expected float or int, got " + type(v).__name__)
        self.__rotation = float(v)
        sio.emit("updatePlayerRotation", self.__rotation)