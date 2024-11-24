const { Enemy } = require('./Enemy')
const { SCREEN } = require('../public/js/classes/Utils')
const {
  backEndEnemies,
  backEndPlayers,
  backEndProjectiles
} = require('./SharedModel')

class EnemyManager {
  static currentLevel = 1
  static enemyId = 0

  static updateEnemies() {
    while (Object.keys(backEndEnemies).length < this.currentLevel) {
      this.createNewEnemy()
    }

    for (const enemyId in backEndEnemies) {
      const enemy = backEndEnemies[enemyId]

      // update position
      enemy.update()
      if (enemy.isOutside()) {
        delete backEndEnemies[enemyId]
      }

      // Collision detection with projectiles
      for (const projectileId in backEndProjectiles) {
        const projectile = backEndProjectiles[projectileId]
        if (enemy.isHitBy(projectile)) {
          if (backEndPlayers[projectile.playerId]) {
            backEndPlayers[projectile.playerId].score++
          }
          delete backEndProjectiles[projectileId]
          delete backEndEnemies[enemyId]
          this.currentLevel += 0.1
          break
        }
      }
    }
  }

  static createNewEnemy() {
    const radius = Math.random() * (20 - 10) + 10

    let x
    let y

    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? 0 - radius : SCREEN.width + radius
      y = Math.random() * SCREEN.height
    } else {
      x = Math.random() * SCREEN.width
      y = Math.random() < 0.5 ? 0 - radius : SCREEN.height + radius
    }

    const color = `hsl(${Math.random() * 360}, 50%, 50%)`

    const angle = Math.atan2(SCREEN.height / 2 - y, SCREEN.width / 2 - x)

    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    }

    backEndEnemies[this.enemyId++] = new Enemy({
      x,
      y,
      radius,
      color,
      velocity
    })
  }
}

module.exports = { EnemyManager, backEndEnemies }
