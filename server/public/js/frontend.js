const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

const socket = io()

const leaderboard = document.querySelector('#leaderboard')

leaderboard.style.marginLeft = SCREEN.width

const devicePixelRatio = window.devicePixelRatio || 1

canvas.width = SCREEN.width * devicePixelRatio
canvas.height = SCREEN.height * devicePixelRatio

c.scale(devicePixelRatio, devicePixelRatio)

const x = canvas.width / 2
const y = canvas.height / 2

const frontEndPlayers = {}
const frontEndProjectiles = {}
const frontEndEnemies = {}

const background = new Background(SCREEN)

socket.emit(
  'initDisplay',
  {
    width: canvas.width,
    height: canvas.height,
    devicePixelRatio
  },
  (response) => {
    const serverUrl = document.querySelector('#serverUrl')
    serverUrl.innerHTML = response.ip
  }
)

socket.on('updateProjectiles', (backEndProjectiles) => {
  for (const id in backEndProjectiles) {
    const backEndProjectile = backEndProjectiles[id]

    if (!frontEndProjectiles[id]) {
      frontEndProjectiles[id] = new Projectile({
        x: backEndProjectile.x,
        y: backEndProjectile.y,
        radius: 5,
        color: frontEndPlayers[backEndProjectile.playerId]?.color,
        velocity: backEndProjectile.velocity
      })
    } else {
      frontEndProjectiles[id].x += backEndProjectiles[id].velocity.x
      frontEndProjectiles[id].y += backEndProjectiles[id].velocity.y
    }
  }

  for (const frontEndProjectileId in frontEndProjectiles) {
    if (!backEndProjectiles[frontEndProjectileId]) {
      delete frontEndProjectiles[frontEndProjectileId]
    }
  }
})

socket.on('updateEnemies', (backEndEnemies) => {
  //console.log('updating enemies')
  for (const id in backEndEnemies) {
    const enemy = backEndEnemies[id]

    if (!frontEndEnemies[id]) {
      frontEndEnemies[id] = new Enemy(enemy)
    } else {
      frontEndEnemies[id].x = enemy.x
      frontEndEnemies[id].y = enemy.y
    }
  }

  for (const id in frontEndEnemies) {
    if (!backEndEnemies[id]) {
      delete frontEndEnemies[id]
    }
  }
})

socket.on('updatePlayers', (backEndPlayers) => {
  for (const id in backEndPlayers) {
    const backEndPlayer = backEndPlayers[id]

    if (!frontEndPlayers[id]) {
      frontEndPlayers[id] = new Player({
        x: backEndPlayer.x,
        y: backEndPlayer.y,
        rotation: backEndPlayer.rotation,
        color: backEndPlayer.color,
        username: backEndPlayer.username
      })

      document.querySelector(
        '#playerLabels'
      ).innerHTML += `<div data-id="${id}" data-score="${backEndPlayer.score}">${backEndPlayer.username}: ${backEndPlayer.score}</div>`
    } else {
      document.querySelector(
        `div[data-id="${id}"]`
      ).innerHTML = `${backEndPlayer.username}: ${backEndPlayer.score}`

      document
        .querySelector(`div[data-id="${id}"]`)
        .setAttribute('data-score', backEndPlayer.score)

      // sorts the players divs
      const parentDiv = document.querySelector('#playerLabels')
      const childDivs = Array.from(parentDiv.querySelectorAll('div'))

      childDivs.sort((a, b) => {
        const scoreA = Number(a.getAttribute('data-score'))
        const scoreB = Number(b.getAttribute('data-score'))

        return scoreB - scoreA
      })

      // removes old elements
      childDivs.forEach((div) => {
        parentDiv.removeChild(div)
      })

      // adds sorted elements
      childDivs.forEach((div) => {
        parentDiv.appendChild(div)
      })

      frontEndPlayers[id].target = {
        x: backEndPlayer.x,
        y: backEndPlayer.y,
        rotation: backEndPlayer.rotation
      }

      if (id === socket.id) {
        const lastBackendInputIndex = playerInputs.findIndex((input) => {
          return backEndPlayer.sequenceNumber === input.sequenceNumber
        })

        if (lastBackendInputIndex > -1)
          playerInputs.splice(0, lastBackendInputIndex + 1)

        playerInputs.forEach((input) => {
          frontEndPlayers[id].target.x += input.dx
          frontEndPlayers[id].target.y += input.dy
        })
      }
    }
  }

  // this is where we delete frontend players
  for (const id in frontEndPlayers) {
    if (!backEndPlayers[id]) {
      const divToDelete = document.querySelector(`div[data-id="${id}"]`)
      divToDelete.parentNode.removeChild(divToDelete)

      if (id === socket.id) {
        document.querySelector('#usernameForm').style.display = 'block'
      }

      delete frontEndPlayers[id]
    }
  }
})

socket.on('enemyKilled', ({ enemy, killedBy }) => {
  Enemy.enemyKilled()
})

let animationId
function animate() {
  animationId = requestAnimationFrame(animate)
  // c.fillStyle = 'rgba(0, 0, 0, 0.1)'
  c.clearRect(0, 0, canvas.width, canvas.height)

  background.draw()

  for (const id in frontEndPlayers) {
    const frontEndPlayer = frontEndPlayers[id]

    // linear interpolation
    if (frontEndPlayer.target) {
      frontEndPlayers[id].x +=
        (frontEndPlayers[id].target.x - frontEndPlayers[id].x) * 0.5
      frontEndPlayers[id].y +=
        (frontEndPlayers[id].target.y - frontEndPlayers[id].y) * 0.5
      frontEndPlayers[id].rotation +=
        (frontEndPlayers[id].target.rotation - frontEndPlayers[id].rotation) *
        0.5
    }

    frontEndPlayer.draw()
  }

  for (const id in frontEndProjectiles) {
    frontEndProjectiles[id].draw()
  }

  for (const id in frontEndEnemies) {
    frontEndEnemies[id].draw()
  }
}

animate()

const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  },
  space: {
    pressed: false
  }
}

const SPEED = 5
const playerInputs = []
let sequenceNumber = 0
setInterval(() => {
  if (keys.w.pressed) {
    sequenceNumber++
    playerInputs.push({ sequenceNumber, dx: 0, dy: -SPEED })
    // frontEndPlayers[socket.id].y -= SPEED
    socket.emit('keydown', { keycode: 'ArrowUp', sequenceNumber })
  }

  if (keys.a.pressed) {
    sequenceNumber++
    playerInputs.push({ sequenceNumber, dx: -SPEED, dy: 0 })
    // frontEndPlayers[socket.id].x -= SPEED
    socket.emit('keydown', { keycode: 'ArrowLeft', sequenceNumber })
  }

  if (keys.s.pressed) {
    sequenceNumber++
    playerInputs.push({ sequenceNumber, dx: 0, dy: SPEED })
    // frontEndPlayers[socket.id].y += SPEED
    socket.emit('keydown', { keycode: 'ArrowDown', sequenceNumber })
  }

  if (keys.d.pressed) {
    sequenceNumber++
    playerInputs.push({ sequenceNumber, dx: SPEED, dy: 0 })
    // frontEndPlayers[socket.id].x += SPEED
    socket.emit('keydown', { keycode: 'ArrowRight', sequenceNumber })
  }

  if (keys.space.pressed) {
    socket.emit('shoot')
  }
}, 15)

window.addEventListener('keydown', (event) => {
  if (!frontEndPlayers[socket.id]) return

  console.log(event.code)

  switch (event.code) {
    case 'ArrowUp':
      keys.w.pressed = true
      break

    case 'ArrowLeft':
      keys.a.pressed = true
      break

    case 'ArrowDown':
      keys.s.pressed = true
      break

    case 'ArrowRight':
      keys.d.pressed = true
      break
    case 'Space':
      keys.space.pressed = true
      break
  }
})

window.addEventListener('keyup', (event) => {
  if (!frontEndPlayers[socket.id]) return

  switch (event.code) {
    case 'ArrowUp':
      keys.w.pressed = false
      break

    case 'ArrowLeft':
      keys.a.pressed = false
      break

    case 'ArrowDown':
      keys.s.pressed = false
      break

    case 'ArrowRight':
      keys.d.pressed = false
      break
    case 'Space':
      keys.space.pressed = false
      break
  }
})
