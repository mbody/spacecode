const express = require('express')
const app = express()
const { networkInterfaces } = require('os')

// socket.io setup
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const { EnemyManager } = require('./classes/EnemyManager')
const {
  backEndPlayers,
  backEndEnemies,
  backEndProjectiles
} = require('./classes/SharedModel')
const { ProjectileManager } = require('./classes/ProjectileManager')
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000 })

const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

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

function degToRad(deg) {
  return deg * (Math.PI / 180)
}

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
    backEndPlayers[socket.id] = {
      id: socket.id,
      x: 1024 * Math.random(),
      y: 576 * Math.random(),
      radius: RADIUS,
      rotation: 45,
      color: `hsl(${360 * Math.random()}, 100%, 50%)`,
      sequenceNumber: 0,
      score: 0,
      username: 'Teacher'
    }

    callback({
      ip: getIpAddress()
    })
  })

  socket.on('initGame', ({ username, color }) => {
    backEndPlayers[socket.id] = {
      id: socket.id,
      x: 1024 * Math.random(),
      y: 576 * Math.random(),
      rotation: 0,
      radius: RADIUS,
      color,
      sequenceNumber: 0,
      score: 0,
      username
    }
  })

  socket.on('disconnect', (reason) => {
    console.log(reason)
    delete backEndPlayers[socket.id]
    io.emit('updatePlayers', backEndPlayers)
  })

  socket.on('updatePlayerX', (x) => {
    const backEndPlayer = backEndPlayers[socket.id]
    if (backEndPlayer) {
      backEndPlayer.x = x
    }
  })
  socket.on('updatePlayerY', (y) => {
    const backEndPlayer = backEndPlayers[socket.id]
    if (backEndPlayer) {
      backEndPlayer.y = y
    }
  })
  socket.on('updatePlayerRotation', (rotation) => {
    const backEndPlayer = backEndPlayers[socket.id]
    if (backEndPlayer) {
      backEndPlayer.rotation = rotation
    }
  })

  socket.on('keydown', ({ keycode, sequenceNumber }) => {
    const backEndPlayer = backEndPlayers[socket.id]

    if (!backEndPlayer) return

    backEndPlayer.sequenceNumber = sequenceNumber
    switch (keycode) {
      case 'ArrowUp':
        // move forward
        backEndPlayer.x += Math.sin(degToRad(backEndPlayer.rotation)) * SPEED
        backEndPlayer.y -= Math.cos(degToRad(backEndPlayer.rotation)) * SPEED
        break

      case 'ArrowLeft':
        // turn anti-clockwise
        backEndPlayer.rotation -= SPEED_ROTATION
        break

      case 'ArrowDown':
        // move backward
        backEndPlayer.x -= Math.sin(degToRad(backEndPlayer.rotation)) * SPEED
        backEndPlayer.y += Math.cos(degToRad(backEndPlayer.rotation)) * SPEED
        break

      case 'ArrowRight':
        // turn clockwise
        backEndPlayer.rotation += SPEED_ROTATION
        break
    }

    /*
    if (backEndPlayer.x > SCREEN.width) {
      backEndPlayer.x -= SCREEN.width
    } else if (backEndPlayer.x < 0) {
      backEndPlayer.x += SCREEN.width
    }
    if (backEndPlayer.y > SCREEN.height) {
      backEndPlayer.y -= SCREEN.height
    } else if (backEndPlayer.y < 0) {
      backEndPlayer.y += SCREEN.height
    }

    */

    const playerSides = {
      left: backEndPlayer.x - backEndPlayer.radius,
      right: backEndPlayer.x + backEndPlayer.radius,
      top: backEndPlayer.y - backEndPlayer.radius,
      bottom: backEndPlayer.y + backEndPlayer.radius
    }

    if (playerSides.left < 0) backEndPlayer.x = backEndPlayer.radius

    if (playerSides.right > 1024) backEndPlayer.x = 1024 - backEndPlayer.radius

    if (playerSides.top < 0) backEndPlayer.y = backEndPlayer.radius

    if (playerSides.bottom > 576) backEndPlayer.y = 576 - backEndPlayer.radius
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

server.listen(port, '0.0.0.0', () => {
  console.log(
    `Spacecode server listening on port ${port}... \nOpen http://localhost:3000 to display the game`
  )
})

function getIpAddress() {
  const nets = networkInterfaces()
  const results = {}
  let firstIp = undefined
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
      const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = []
        }
        results[name].push(net.address)
        if (!firstIp) {
          firstIp = net.address
        }
      }
    }
  }

  return firstIp
}
