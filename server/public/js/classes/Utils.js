const SCREEN = {
  width: 1024,
  height: 576
}

class Utils {
  static degToRad(deg) {
    return deg * (Math.PI / 180)
  }
  static getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

  static getRandomColor() {
    return `hsl(${360 * Math.random()}, 100%, 50%)`
  }
}

// hack for back
if (typeof window === 'undefined') {
  module.exports = { SCREEN, Utils }
} else {
  module = {}
}
