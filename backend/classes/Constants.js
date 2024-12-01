const CONSTANTES = {
  SCREEN: {
    width: 1024,
    height: 576
  },
  // PROJECTILES
  PROJECTILE_RADIUS: 5,
  PROJECTILE_SPEED: 5,
  // PLAYER
  PLAYER_SPEED: 5,
  PLAYER_ROTATION_SPEED: 5,
  PLAYER_RADIUS: 20,
  PLAYER_RESPAWN_DELAY: 5000,
  PLAYER_INVICIBLE_DELAY: 3000,
  SHOOT_INTERVAL: 500,
  // ENEMY
  ENEMY_RADIUS: 20, // has to match enemy.svg file size /2 !
  LEVEL_PROGRESS_PER_KILL: 0.1,
  // BONUS
  BONUS_RADIUS: 10,
  BONUS_SPEED: 8,
  BONUS_SCORE: 10,
  BONUS_PER_NB_KILLS: 20
}

module.exports = CONSTANTES
