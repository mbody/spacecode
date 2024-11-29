const { SCREEN } = require('../../frontend/js/classes/Utils')
const NetworkManager = require('./NetworkManager')
const { Player } = require('./Player')
const {
  backEndEnemies,
  backEndPlayers,
  backEndProjectiles,
  backEndBonuses
} = require('./SharedModel')

class PlayerManager {
  static updatePlayers() {
    for (const id in backEndPlayers) {
      const player = backEndPlayers[id]

      if (player.isOutside()) {
      }

      // Collision detection with enemies
      if (!player.invicible) {
        for (const enemyId in backEndEnemies) {
          const enemy = backEndEnemies[enemyId]
          if (player.isHitBy(enemy)) {
            // Player hit
            PlayerManager.onPlayerDie({ player })

            if (PlayerManager.hasNoMorePlayer()) {
              return false
            }
            break
          }
        }
      }

      // Collision avec bonus
      if (player.alive) {
        for (const bonusId in backEndBonuses) {
          const bonus = backEndBonuses[bonusId]
          if (player.isHitBy(bonus)) {
            // Player hit
            PlayerManager.onPlayerBonus({ player, bonus })
            delete backEndBonuses[bonusId]
            break
          }
        }
      }
    }
    return true
  }

  static hasNoMorePlayer() {
    return Object.values(backEndPlayers).find((p) => p.alive) === undefined
  }

  static createNewPlayer(data) {
    backEndPlayers[data.id] = new Player(data)
  }

  static updateProperty({ playerId, property, value }) {
    const backEndPlayer = backEndPlayers[playerId]
    if (backEndPlayer) {
      backEndPlayer[property] = value
    }
  }

  static onPlayerDie({ player }) {
    NetworkManager.io.emit('playerKilled', { player })
    player.die()
  }

  static onPlayerBonus({ player, bonus }) {
    NetworkManager.io.emit('playerBonus', { player, bonus })
    player.collectBonus(bonus)
  }

  static getWinner() {
    let winner = undefined
    Object.values(backEndPlayers).forEach((p) => {
      if (winner === undefined || winner.score < p.score) {
        winner = p
      }
    })
    return winner
  }

  static resetAllPlayers() {
    Object.values(backEndPlayers).forEach((player) => {
      player.reset()
    })
    PlayerManager.lastSurvivor = undefined
  }
}

module.exports = { PlayerManager }
