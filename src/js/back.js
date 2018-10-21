import Util from './util'
class MikuBack {
  constructor (w, h, c = '#cfea99') {
    this.w = w
    this.h = h
    this.c = c
    this.switching = false
  }
  init () {
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.ctx = this.canvas.getContext('2d')
    this.ctx.fillStyle = this.c
    this.ctx.fillRect(0, 0, this.w, this.h)
  }
  addSwitch (time) {
    if (this.switching) return
    this.switching = true
    this.ttime = time
    this.ctime = 0
    this.animateTimer = null
    this.ncolor = Util.getRandomColor()
    this.createPoints()
    this.renderPoints()
  }
  createPoints () {
    this.curDirect = Util.getRandomCount(1, 4)
    let count = Util.getRandomCount(2, 5)
    let points = []
    let mp = []
    let sa = 10
    let sw = this.w / sa
    let sh = this.h / sa
    let sr = Util.getRandomValue(sa, count, true)
    this.sp = {x:0,y:0};
    this.ep = {x:0,y:0};
    sr.sort((a, b) => {
      return a > b ? 1 : -1
    })
    let that = this
    switch (this.curDirect) {
      case 1: {
        that.ops = sr.map(cv => {
          let y = Math.random() * 2 * sh
          return {
            x: cv * sw,
          y}
        })
        that.dps = that.ops.map(cv => {
          return {
            x: cv.x,
            y: cv.y + that.h
          }
        })
        that.sp = {
          x: 0,y: 0
        }
        that.ep = {
          x: that.w,y: 0
        }
        break
      }
      case 3: {
        that.ops = sr.map(cv => {
          let y = that.h - Math.random() * 2 * sh
          return {
            x: cv * sw,
          y}
        })
        that.dps = that.ops.map(cv => {
          return {
            x: cv.x,
            y: cv.y - that.h
          }
        })
        that.sp = {
          x: 0,y: that.h
        }
        that.ep = {
          x: that.w,y: that.h
        }
        break
      }
      case 2: {
        that.ops = sr.map(cv => {
          let x = Math.random() * 2 * sw
          return {
            x,
            y: cv * sh
          }
        })
        that.dps = that.ops.map(cv => {
          return {
            x: cv.x + that.w,
            y: cv.y
          }
        })
        that.sp = {
          x: 0,y: 0
        }
        that.ep = {
          x: 0,y: that.h
        }
        break
      }
      case 4: {
        that.ops = sr.map(cv => {
          let x = that.w - Math.random() * 2 * sw
          return {
            x,
            y: cv * sh
          }
        })
        that.dps = that.ops.map(cv => {
          return {
            x: cv.x - that.w,
            y: cv.y
          }
        })
        that.sp = {
          x: that.w,y: 0
        }
        that.ep = {
          x: that.w,y: that.h
        }
        break
      }
      default:
        break
    }
  }
  renderPoints () {
    let that = this
    that.cps = that.ops.map((cv,i) => {
      let x = Util.getCurValue('linear', cv.x, that.dps[i].x, that.ctime, that.ttime)
      let y = Util.getCurValue('linear', cv.y, that.dps[i].y, that.ctime, that.ttime)
      return {x,y}
    })
    let pa = [that.sp, ...that.cps, that.ep, that.sp]
    that.renderCtx(pa)
    that.ctime++
    if (that.ctime>that.ttime) {
      that.switching = false
      that.ctime = 0
      that.animateTimer = null
      cancelAnimationFrame(that.animateTimer)
    }else {
      that.animateTimer = requestAnimationFrame(that.renderPoints.bind(that))
    }
  }
  renderCtx (ps) {
    this.ctx.fillStyle = this.ncolor
    this.ctx.beginPath()
    let that = this
    ps.forEach((cv, i) => {
      if (i == 0) {
        that.ctx.moveTo(cv.x, cv.y)
      }else {
        that.ctx.lineTo(cv.x, cv.y)
      }
    })
    this.ctx.closePath()
    this.ctx.fill()
  }
  uninit () {
    this.ctx = null
    this.canvas = null
  }
}

export default MikuBack
