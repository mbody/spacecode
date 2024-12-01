let socket

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

const KEYMAP = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right'
}

class SpacecodeManager {
  x
  y
  rotation
  keycodes = {}

  constructor() {
    window.addEventListener('keydown', (event) => {
      console.log('key: ' + event.key)
      this.keycodes[event.key] = true
    })

    window.addEventListener('keyup', (event) => {
      this.keycodes[event.key] = false
    })
  }

  connect(username, color) {
    socket = io()
    socket.emit('newPlayer', { username, color }, this.onInitGame)
  }
  disconnect() {
    socket.disconnect()
  }
  onInitGame = ({ width, height }) => {
    this.screenWidth = width
    this.screenHeihgt = height
  }
  moveForward() {
    this._emitKeydown('ArrowUp')
  }
  moveBackward() {
    this._emitKeydown('ArrowDown')
  }
  turnRight() {
    this._emitKeydown('ArrowRight')
  }
  turnLeft() {
    this._emitKeydown('ArrowLeft')
  }

  setRotation(angle) {
    this.updatePlayerProperty('rotation', angle)
  }
  setX(x) {
    this.updatePlayerProperty('x', x)
  }
  setY(y) {
    this.updatePlayerProperty('y', y)
  }
  updatePlayerProperty(key, value) {
    socket.emit('updatePlayerProperty', { key, value })
  }

  isKeyPressed(code) {
    return this.keycodes[code]
  }

  async update() {
    await sleep(1000 / 20)
  }

  shoot() {
    socket.emit('shoot')
  }

  //// privates methods

  _emitKeydown(keycode) {
    socket.emit('keydown', { keycode }, this._onPlayerPositionUpdated)
  }

  _onPlayerPositionUpdated = ({ x, y, rotation }) => {
    //console.log(`New player position : ${x}, ${y}, ${rotation}`)
    this.x = x
    this.y = y
    this.rotation = rotation
  }
}

const Spacecode = new SpacecodeManager()
