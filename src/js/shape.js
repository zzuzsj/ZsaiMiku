import { MikuRect } from './shapes'
import Util from './util'

class MikuShape {
  constructor (w, h, type, ctx) {
    this.type = type
    this.w = w
    this.h = h
    this.ox = this.w / 2
    this.oy = this.h / 2
    this.ctx = ctx
    this.init()
  }
  init () {
    this.eleArray = []
    this.time = 0
    this.switchEnd = false
    this.selectType()
  }
  selectType () {
    this.eleArray = TypeCase[this.type](this.w, this.h, this.ctx)
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
    let mc = w>475?20:12        
    let count = Util.getRandomCount(6, mc)
    let elearr = []
    for (let i = 0;i < count;i++) {
      let r = Util.getRandomCount(10, Math.floor(h/30))
      let c = Util.getRandomColor()
      let st = {x: w / 2,y: h / 2,s: 0,r,rot: 0,c}
      let rx = Util.getRandomCount(0, w)
      let ry = Util.getRandomCount(0, h)
      let t1 = {x: rx,y: ry,s: 1,rot: Math.PI,t: 30}
      let t2 = {rot: 0,s: 0,t: 30,dt: 50}
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
    let s = 8;
    let r = Math.floor(w/s);
    let c = Util.getRandomColor()
    let st = {x: w / 2,y: h / 2,s: 0,r,rot: 0,c}
    let t1 = {s: s,rot: Math.PI,t: 30}
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
    let mc = w>475?20:12        
    let count = Util.getRandomCount(6,mc)
    let elearr = []
    for (let i = 0;i < count;i++) {
      let r = Util.getRandomCount(10, Math.floor(h/30))
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
    let mc = w>475?20:12    
    let count = Util.getRandomCount(6, mc)
    let elearr = []
    for (let i = 0;i < count;i++) {
      let r = Util.getRandomCount(10, Math.floor(h/30))
      let c = Util.getRandomColor()
      let rx = Util.getRandomCount(0, w)
      let ry = Util.getRandomCount(0, h)
      let st = {x: rx,y: ry,s: 0,r,rot: 0,c}
      let rt = Util.getRandomCount(0, 20)
      let t1 = {s: 1.2,t: 20,dt: rt}
      let t2 = {s: 1,t: 10}
      let t3 = {s: 0,t: 10,dt: 20}
      let robj = {
        strail: st,
        trails: [t1, t2, t3],
        type: 'arc',
        isFill: true,
        ctx: ctx
      }
      elearr.push(new MikuRect(robj))
    }
    return elearr
  }
  static type_5 (w, h, ctx) {
    let count = Util.getRandomCount(3, 7)
    let type = Math.random() < 0.5
    let elearr = []
    let px = w / (count - 1)
    let py = h / (count - 1)
    let c = Util.getRandomColor()
    let r = Util.getRandomCount(2, 10)
    let ps = []
    for (let i = 0;i < count;i++) {
      let rx = type ? Util.getRandomCount(0, w) : px * i
      let ry = !type ? Util.getRandomCount(0, h) : py * i
      let st = {x: rx,y: ry,s: 1,r,rot: 0,c,round:true}
      if (i > 0) {
        st.x = ps[i - 1].rx
        st.y = ps[i - 1].ry
      }
      let t1 = {x: rx,y: ry,t: count * 5,dt: i * 5,at: 5}
      let robj = {
        strail: st,
        trails: [t1],
        type: 'line',
        isFill: true,
        ctx: ctx
      }
      ps.push({rx,ry})
      elearr.push(new MikuRect(robj))
    }
    return elearr
  }
  static type_6 (w, h, ctx) {
    let ox = w / 2
    let oy = h / 2
    let mc = w>475?9:7
    let count = Util.getRandomCount(4, mc)
    let type = Math.random() < 0.5
    let pr = Math.PI * 2 / (count - 1)
    let elearr = []
    let c = Util.getRandomColor()
    let r = Util.getRandomCount(2, 10)
    let radius = Util.getRandomCount(20, Math.floor(w / 2))
    let ps = []
    let at = Util.getRandomCount(5, 15)
    for (let i = 0;i < count;i++) {
      let cr = pr * i
      if (!type) cr = (count - i) * pr
      let rx = Math.cos(cr) * radius + ox
      let ry = Math.sin(cr) * radius + oy
      let st = {x: rx,y: ry,s: 1,r,rot: 0,c,round:true}
      if (i > 0) {
        st.x = ps[i - 1].rx
        st.y = ps[i - 1].ry
      }
      let t1 = {x: rx,y: ry,t: count * (at - 3),dt: i * at,at: at}
      let robj = {
        strail: st,
        trails: [t1],
        type: 'line',
        isFill: true,
        ctx: ctx
      }
      ps.push({rx,ry})
      elearr.push(new MikuRect(robj))
    }
    return elearr
  }
  static type_7 (w, h, ctx) {
    let ox = w / 2
    let oy = h / 2
    let count = Util.getRandomCount(2, 5)
    let elearr = []
    let c = Util.getRandomColor()
    let r = Util.getRandomCount(2, 10)
    let at = Util.getRandomCount(5, 15)
    let rx = Util.getRandomCount(0, w)
    let ry = Util.getRandomCount(0, h)
    let st = {x: rx,y: ry,s: 1,r,rot: 0,c,round:true}
    let ts = []
    for (let i = 0;i < count;i++) {
      rx = Util.getRandomCount(0, w)
      ry = Util.getRandomCount(0, h)
      let t1 = {x: rx,y: ry,t: at,at: at}
      ts.push(t1)
    }
    let robj = {
      strail: st,
      trails: ts,
      type: 'line',
      isFill: true,
      ctx: ctx
    }
    elearr.push(new MikuRect(robj))
    return elearr
  }
  static type_8 (w, h, ctx) {
    let ox = w / 2
    let oy = h / 2
    let ow = (w>h?h:w)-100;        
    let sx = (w-ow)/2;
    let sy = (h-ow)/2;
    let type = Math.random()<0.5
    let count = Util.getRandomCount(3, 15)
    let elearr = []
    let c = Util.getRandomColor()
    let pw = Math.floor(ow/count);
    let r = Util.getRandomCount(Math.floor(pw/2),pw);
    let at = Util.getRandomCount(10, 20)
    let dir = Math.random()<0.5
    for(let i =0;i<count;i++){
      if(i%2==0) continue
      let dt = Util.getRandomCount(0,10);
      let rx = 0,ry = 0,ex = 0,ey = 0;
      if(type){
        rx = Math.floor(ox-ow/2);
        ex = Math.floor(ox+ow/2);
        ry = Math.floor(sy+i*pw);
        ey = ry
      }else{
        ry = Math.floor(oy-ow/2);
        ey = Math.floor(oy+ow/2);
        rx = Math.floor(sx+i*pw);
        ex = rx
      }
      if(!dir){
        [rx,ex] = [ex,rx];
        [ry,ey] = [ey,ry];
      }
      let st = {x: rx,y: ry,s: 1,r,rot: 0,c}
      let t1 = {x: ex,y: ey,t: 2*at,at: at,dt:dt}
      let robj = {
        strail: st,
        trails: [t1],
        type: 'line',
        isFill: true,
        ctx: ctx
      }
      elearr.push(new MikuRect(robj))
    }
    return elearr
  }
}

export default MikuShape
