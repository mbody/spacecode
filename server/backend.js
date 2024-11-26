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

const displayers = {}

const SPEED = 5
const SPEED_ROTATION = 10
const RADIUS = 10
const PROJECTILE_RADIUS = 5
let projectileId = 0

const SCREEN = {
  width: 1024,
  height: 576
}

NetworkManager.startApp()

const io = NetworkManager.io

io.on('connection', (socket) => {
  console.log('a user connected')

  io.emit('updatePlayers', backEndPlayers)

  socket.on('shoot', () => {
    player = backEndPlayers[socket.id]
    if (!player) return

    ProjectileManager.createNewProjectile(player)
  })

  socket.on('initDisplay', ({ width = 0, height = 0 }, callback) => {
    displayers[socket.id] = {
      canvas: {
        width,
        height
      }
    }
    // ///debug///////////////////////////////////////////////////////////////

    PlayerManager.createNewPlayer({
      id: socket.id,
      radius: RADIUS,
      rotation: 45,
      color: `hsl(${360 * Math.random()}, 100%, 50%)`,
      sequenceNumber: 0,
      score: 0,
      username: 'Teacher'
    })

    callback({
      ip: NetworkManager.getIpAddress()
    })
  })

  socket.on('initGame', ({ username, color }) => {
    PlayerManager.createNewPlayer({
      id: socket.id,
      radius: RADIUS,
      color,
      username
    })
  })

  socket.on('disconnect', (reason) => {
    console.log(reason)
    delete backEndPlayers[socket.id]
    io.emit('updatePlayers', backEndPlayers)
  })

  socket.on('updatePlayerX', (x) => {
    PlayerManager.updateProperty({
      playerId: socket.id,
      attribute: 'x',
      value: x
    })
  })
  socket.on('updatePlayerY', (y) => {
    PlayerManager.updateProperty({
      playerId: socket.id,
      attribute: 'y',
      value: y
    })
  })
  socket.on('updatePlayerRotation', (rotation) => {
    PlayerManager.updateProperty({
      playerId: socket.id,
      attribute: 'rotation',
      value: rotation
    })
  })

  socket.on('keydown', ({ keycode, sequenceNumber }) => {
    const backEndPlayer = backEndPlayers[socket.id]

    if (!backEndPlayer) return

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
  })
})

// backend ticker
setInterval(() => {
  // update projectile positions
  ProjectileManager.updateProjectiles()

  // update enemies with projectiles
  EnemyManager.updateEnemies()

  io.emit('updateProjectiles', backEndProjectiles)
  io.emit('updatePlayers', backEndPlayers)
  //console.log('updating ' + JSON.stringify(backEndEnemies))
  io.emit('updateEnemies', backEndEnemies)
}, 15)
