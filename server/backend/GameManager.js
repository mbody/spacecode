const { EnemyManager } = require('./classes/EnemyManager')
const {
  backEndPlayers,
  backEndEnemies,
  backEndProjectiles
} = require('./classes/SharedModel')
const { ProjectileManager } = require('./classes/ProjectileManager')
const { PlayerManager } = require('./classes/PlayerManager')
const { Player } = require('./classes/Player')
const NetworkManager = require('./classes/NetworkManager')

class GameManager {
  displayers = {}

  constructor() {
    NetworkManager.io.on('connection', this.onConnection)
    // backend ticker
    setInterval(this.loop, 15)
  }

  onConnection = (socket) => {
    console.log('New client connected !')
    socket.on('initDisplay', (data, callback) =>
      this.onInitDisplay(socket.id, data, callback)
    )
    socket.on('newPlayer', (data) => this.onNewPlayer(socket.id, data))
    socket.on('disconnect', (data) => this.onDisconnect(socket.id, data))
    socket.on('updatePlayerX', (data) =>
      this.onUpdatePlayerProperty(socket.id, 'x', data)
    )
    socket.on('updatePlayerY', (data) =>
      this.onUpdatePlayerProperty(socket.id, 'y', data)
    )
    socket.on('updatePlayerRotation', (data) =>
      this.onUpdatePlayerProperty(socket.id, 'rotation', data)
    )
    socket.on('keydown', (data) => this.onKeydown(socket.id, data))
    socket.on('shoot', (data) => this.onShoot(socket.id, data))

    NetworkManager.emit('updatePlayers', backEndPlayers)
  }

  onShoot = (playerId) => {
    const player = backEndPlayers[playerId]
    if (!player) return

    player.shoot()
  }

  onKeydown = (playerId, { keycode, sequenceNumber }) => {
    const backEndPlayer = backEndPlayers[playerId]

    if (!backEndPlayer || !backEndPlayer.alive) return

    backEndPlayer.sequenceNumber = sequenceNumber
    switch (keycode) {
      case 'ArrowUp':
        backEndPlayer.moveForward()
        break

      case 'ArrowLeft':
        // turn anti-clockwise
        backEndPlayer.turnLeft()
        break

      case 'ArrowDown':
        // move backward
        backEndPlayer.moveBackward()
        break

      case 'ArrowRight':
        // turn clockwise
        backEndPlayer.turnRight()
        break
    }
    backEndPlayer.checkConstraints()
  }

  onUpdatePlayerProperty = (playerId, property, value) => {
    const player = backEndPlayers[playerId]
    if (!player || !player.alive) return

    PlayerManager.updateProperty({
      playerId,
      property,
      value
    })
  }

  onDisconnect(clientId, reason) {
    console.log(reason)
    delete backEndPlayers[clientId]
    delete this.displayers[clientId]
    NetworkManager.emit('updatePlayers', backEndPlayers)
  }

  onNewPlayer = (playerId, { username, color }) => {
    PlayerManager.createNewPlayer({
      id: playerId,
      color,
      username
    })
  }

  onInitDisplay = (clientId, { width = 0, height = 0 }, callback) => {
    this.displayers[clientId] = {
      canvas: {
        width,
        height
      }
    }
    // ///debug///////////////////////////////////////////////////////////////

    PlayerManager.createNewPlayer({
      id: clientId,
      rotation: 45,
      color: `hsl(${360 * Math.random()}, 100%, 50%)`,
      sequenceNumber: 0,
      score: 0,
      username: 'Me'
    })

    callback({
      ip: NetworkManager.getIpAddress()
    })
  }

  ////

  loop = () => {
    // update projectile positions
    ProjectileManager.updateProjectiles()

    // update enemies with projectiles
    EnemyManager.updateEnemies()

    // update players
    const hasPlayerAlive = PlayerManager.updatePlayers()
    if (!hasPlayerAlive) {
      this.gameOver()
    }

    NetworkManager.io.emit('updateProjectiles', backEndProjectiles)
    NetworkManager.io.emit('updatePlayers', backEndPlayers)
    //console.log('updating ' + JSON.stringify(backEndEnemies))
    NetworkManager.io.emit('updateEnemies', backEndEnemies)
  }

  gameOver() {
    const winner = PlayerManager.getWinner()
    NetworkManager.io.emit('gameOver', winner)
    EnemyManager.resetAllEnemies()
    PlayerManager.resetAllPlayers()
  }
}

module.exports = { GameManager }
