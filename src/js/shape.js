import {MikuRect} from './shapes'
import Util from './util'

class MikuShape {
  constructor (w, h, type,ctx) {
    this.type = type
    this.w = w
    this.h = h
    this.ox = this.w / 2
    this.oy = this.h / 2
    this.ctx = ctx;
    this.init()
  }
  init () {
    this.eleArray = []
    this.time = 0
    this.switchEnd = false
    this.selectType()
  }
  selectType () {
    this.eleArray = TypeCase[this.type](this.w,this.h,this.ctx);
  }
  shapeRender () {
    if (this.switchEnd) return
    let that = this
    this.eleArray.forEach(cv => {
      cv.update()
    })
  }
  shapeFilter () {
    this.eleArray = this.eleArray.filter(cv => {
      return !cv.isEnd
    })
    if (this.eleArray.length <= 0) {
      this.switchEnd = true
      this.uninit()
    }
  }
  shapeUpdate () {
    this.shapeFilter()
    this.shapeRender()
  }
  uninit () {
    this.type = ''
    this.ctx = null
    this.eleArray = []
    this.time = 0
  }
}

class TypeCase {
  static type_1 (w, h, ctx) {
    let count = Util.getRandomCount(6, 12)
    let elearr = []
    for (let i = 0;i < count;i++) {
      let r = Util.getRandomCount(10, 20)
      let c = Util.getRandomColor()
      let st = {x: w / 2,y: h / 2,s: 0,r,rot: 0,c}
      let rx = Util.getRandomCount(0, w)
      let ry = Util.getRandomCount(0, h)
      let t1 = {x: rx,y: ry,s: 1,rot: Math.PI,t: 30}
      let t2 = {rot: 0,s: 0,t: 30,dt:50}
      let robj = {
        strail: st,
        trails: [t1, t2],
        type: 'rect',
        isFill: true,
        ctx: ctx
      }
      elearr.push(new MikuRect(robj))
    }
    return elearr
  }
  static type_2 (w, h, ctx) {
    let count = Util.getRandomCount(3, 6)
    let elearr = []
    let r = 50
    let c = Util.getRandomColor()
    let st = {x: w / 2,y: h / 2,s: 0,r,rot: 0,c}
    let t1 = {s: 8,rot: Math.PI,t: 30}
    let robj = {
      strail: st,
      trails: [t1],
      type: 'polygon',
      isFill: false,
      ctx: ctx,
      count: count
    }
    elearr.push(new MikuRect(robj))
    return elearr
  }
  static type_3 (w, h, ctx) {
    let count = Util.getRandomCount(6, 12)
    let elearr = []
    for (let i = 0;i < count;i++) {
      let r = Util.getRandomCount(10, 20)
      let c = Util.getRandomColor()
      let st = {x: w / 2,y: h / 2,s: 0,r,rot: 0,c}
      let rx = Util.getRandomCount(0, w)
      let ry = Util.getRandomCount(0, h)
      let t1 = {x: rx,y: ry,s: 1,t: 30}
      let t2 = {rot: 0,s: 0,t: 30}
      let robj = {
        strail: st,
        trails: [t1, t2],
        type: 'arc',
        isFill: true,
        ctx: ctx
      }
      elearr.push(new MikuRect(robj))
    }
    return elearr
  }
  
  static type_4 (w, h, ctx) {
    let count = Util.getRandomCount(6, 12)
    let elearr = []
    for (let i = 0;i < count;i++) {
      let r = Util.getRandomCount(10, 20)
      let c = Util.getRandomColor()
      let rx = Util.getRandomCount(0, w)
      let ry = Util.getRandomCount(0, h)
      let st = {x: rx,y: ry,s: 0,r,rot: 0,c}
      let rt = Util.getRandomCount(0,20);
      let t1 = {s: 1.2,t: 20,dt:rt}
      let t2 = {s: 1,t: 10}
      let t3 = {s: 0,t: 10,dt:20}
      let robj = {
        strail: st,
        trails: [t1, t2,t3],
        type: 'arc',
        isFill: true,
        ctx: ctx
      }
      elearr.push(new MikuRect(robj))
    }
    return elearr
  }
}

export default MikuShape