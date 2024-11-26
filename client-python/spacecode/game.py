
import sys
from .network import sio
import time
import json
from .player import Player


class Game:
    def __init__(self, username, color, host="localhost", port=3000):
        url = f"http://{host}:{port}"
        print(f"Connecting to a new game on {url} with username: {username} and color: {color}" )
        self.username = username
        self.color = color
        self.currentPlayer = Player()

        sio.connect(url)
        sio.emit("newPlayer", {"username": username, "color": color})

    def update(self):
        time.sleep(1/20)