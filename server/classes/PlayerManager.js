const { SCREEN } = require('../public/js/classes/Utils')
const { Player } = require('./Player')
const {
  backEndEnemies,
  backEndPlayers,
  backEndProjectiles
} = require('./SharedModel')

class PlayerManager {
  static updatePlayers() {
    for (const id in backEndPlayers) {
      const player = backEndPlayers[id]
      player.update()

      if (player.isOutside()) {
      }
    }
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
}

module.exports = { PlayerManager }
