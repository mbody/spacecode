class Enemy extends GameObject {
  static dieSound

  constructor({ x, y, radius, color, velocity }) {
    super()
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = velocity
  }

  draw() {
    if (!this.sprite) {
      this.sprite = GameObject.getMediaById('enemy')
    }
    c.beginPath()
    //c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    //c.fillStyle = this.color
    c.drawImage(this.sprite, this.x - this.radius, this.y - this.radius)
    c.fill()
  }

  static enemyKilled() {
    if (!this.dieSound) {
      this.dieSound = GameObject.getMediaById('enemyDie')
    }
    this.dieSound.play()
  }
}
