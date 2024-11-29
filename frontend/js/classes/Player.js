class Player {
  HEIGHT = 30
  WIDTH = 8

  constructor({ x, y, rotation, color, username, invicible, alive }) {
    this.x = x
    this.y = y
    this.rotation = rotation
    this.color = color
    this.originalColor = color
    this.username = username
    this.alive = alive
    this.invicible = invicible
  }

  updateFromBackend({ alive, invicible }) {
    this.alive = alive
    if (!invicible && this.invicible) {
      this.color = this.originalColor
    }
    this.invicible = invicible
  }

  draw() {
    if (this.alive) {
      if (this.invicible) {
        const blink = Math.floor(Date.now() / 500.0) % 2 == 0
        this.color = blink ? 'white' : this.originalColor
      }

      c.font = '12px sans-serif'
      c.fillStyle = 'white'
      c.textAlign = 'center'
      c.fillText(this.username, this.x, this.y + 35)
      c.save()
      c.shadowColor = this.color
      c.shadowBlur = this.invicible ? 40 : 20
      this.drawBody()
      c.restore()
    }
  }

  drawBody() {
    const bottomCenter = {
      x: 0,
      y: this.HEIGHT * 0.3
    }
    c.save()
    c.translate(this.x, this.y)
    c.rotate(Utils.degToRad(this.rotation))

    // Set the fill color for the ellipse
    c.fillStyle = this.color

    // Begin the path for the ellipse shape
    c.beginPath()
    c.moveTo(bottomCenter.x, bottomCenter.y)

    // Half bottom line
    c.lineTo(bottomCenter.x + this.WIDTH * 0.3, bottomCenter.y)
    // Right curved line
    c.bezierCurveTo(
      bottomCenter.x + this.WIDTH,
      bottomCenter.y - this.HEIGHT * 0.2,
      bottomCenter.x + this.WIDTH,
      bottomCenter.y - this.HEIGHT * 0.8,
      bottomCenter.x,
      bottomCenter.y - this.HEIGHT
    )
    // Left curved line
    c.bezierCurveTo(
      bottomCenter.x - this.WIDTH,
      bottomCenter.y - this.HEIGHT * 0.8,
      bottomCenter.x - this.WIDTH,
      bottomCenter.y - this.HEIGHT * 0.2,
      bottomCenter.x - this.WIDTH * 0.3,
      bottomCenter.y
    )
    // Other half bottom line
    c.lineTo(bottomCenter.x, bottomCenter.y)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    c.strokeStyle = '#000000'
    c.lineWIDTH = 1
    c.stroke()
    this.drawFoot(this.WIDTH)
    this.drawFoot(-this.WIDTH)
    this.drawWindow()
    c.restore()
  }

  drawFoot(offsetWIDTH) {
    c.beginPath()
    c.moveTo(offsetWIDTH * 0.85, 0)
    c.quadraticCurveTo(
      offsetWIDTH * 2,
      this.HEIGHT * 0.15,
      offsetWIDTH * 1.2,
      this.HEIGHT * 0.45
    )
    c.lineTo(offsetWIDTH, this.HEIGHT * 0.45)
    c.quadraticCurveTo(
      offsetWIDTH * 1.2,
      this.HEIGHT * 0.2,
      offsetWIDTH * 0.6,
      this.HEIGHT * 0.25
    )
    c.lineWIDTH = 0.5
    c.fillStyle = this.color
    c.strokeStyle = '#000000'
    c.closePath()
    c.fill()
    c.stroke()
  }

  drawWindow() {
    const initialX = 0
    const windowRadius = this.WIDTH * 0.4
    const windowYPosition = -this.HEIGHT * 0.3
    c.beginPath()
    c.moveTo(windowRadius, windowYPosition)
    c.arc(initialX, windowYPosition, windowRadius, 0, 2 * Math.PI)
    c.lineWIDTH = 1
    c.fillStyle = '#1297E0'
    c.strokeStyle = '#0067B0'
    c.closePath()
    c.fill()
    c.stroke()
  }

  static playerKilled() {
    if (!this.dieSound) {
      this.dieSound = GameObject.getMediaById('playerDie')
    }
    this.dieSound.play()
  }
}
