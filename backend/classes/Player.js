const { Utils } = require('../../frontend/js/classes/Utils')
const {
  SCREEN,
  PLAYER_SPEED,
  PLAYER_ROTATION_SPEED,
  PLAYER_RADIUS,
  PLAYER_RESPAWN_DELAY,
  PLAYER_INVICIBLE_DELAY,
  SHOOT_INTERVAL,
  BONUS_RADIUS,
  BONUS_SCORE
} = require('./Constants')
const { GameObject } = require('./GameObject')
const { ProjectileManager } = require('./ProjectileManager')

class Player extends GameObject {
  lastShootTimestamp = 0

  constructor({
    id,
    username,
    score = 0,
    rotation = 0,
    radius = PLAYER_RADIUS,
    ...data
  }) {
    super({ radius, ...data })

    this.id = id
    this.rotation = rotation
    this.username = username
    this.score = score
    this.alive = true
    this.invicible = false
  }

  moveForward() {
    this.x += Math.sin(Utils.degToRad(this.rotation)) * PLAYER_SPEED
    this.y -= Math.cos(Utils.degToRad(this.rotation)) * PLAYER_SPEED
  }
  moveBackward() {
    this.x -= Math.sin(Utils.degToRad(this.rotation)) * PLAYER_SPEED
    this.y += Math.cos(Utils.degToRad(this.rotation)) * PLAYER_SPEED
  }
  turnLeft() {
    this.rotation -= PLAYER_ROTATION_SPEED
  }
  turnRight() {
    this.rotation += PLAYER_ROTATION_SPEED
  }
  checkConstraints() {
    const playerSides = {
      left: this.x - this.radius,
      right: this.x + this.radius,
      top: this.y - this.radius,
      bottom: this.y + this.radius
    }

    if (playerSides.left < 0) this.x = this.radius

    if (playerSides.right > SCREEN.width) this.x = SCREEN.width - this.radius

    if (playerSides.top < 0) this.y = this.radius

    if (playerSides.bottom > SCREEN.height) this.y = SCREEN.height - this.radius
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
  }

  die() {
    this.alive = false
    this.x = SCREEN.width * Math.random()
    this.y = SCREEN.height * Math.random()
    setTimeout(this.respawn, PLAYER_RESPAWN_DELAY)
  }

  collectBonus() {
    this.score += BONUS_SCORE
    this.respawn()
  }

  respawn = () => {
    this.alive = true
    this.invicible = true
    setTimeout(() => {
      this.invicible = false
    }, PLAYER_INVICIBLE_DELAY)
  }

  reset() {
    this.score = 0
  }

  canShoot() {
    return (
      this.alive &&
      Date.now() - this.lastShootTimestamp > SHOOT_INTERVAL - this.score * 2
    )
  }

  shoot() {
    if (!this.canShoot()) return
    ProjectileManager.createNewProjectile(this)
    // retropus from firing
    // this.moveBackward()
    this.lastShootTimestamp = Date.now()
  }
}

module.exports = { Player }
