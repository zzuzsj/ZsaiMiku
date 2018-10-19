import MikuShape from "./shape"

class MikuCont {
  constructor (w, h) {
    this.w = w
    this.h = h
    this.init();
  }
  init () {
    this.canvas = document.createElement('canvas')
    this.canvas.width = this.w
    this.canvas.height = this.h
    this.ctx = this.canvas.getContext('2d')
    this.shapeArray = []
  }
  addShape(type){
    let shape = new MikuShape(this.w,this.h,type,this.ctx);
    this.shapeArray.push(shape);
  }
  contFilter(){
    if(this.shapeArray.length>0){
      this.shapeArray = this.shapeArray.filter(cv=>{
          return !cv.switchEnd;
      });
    }
  }
  contRender(){
    if(this.shapeArray.length>0){
      let that = this;
      this.ctx.clearRect(0,0,this.w,this.h);
      that.shapeArray.forEach(cv=>{
          cv.shapeUpdate();
          // if(!cv.switchEnd){
          //   that.ctx.drawImage(cv.canvas,0,0,that.w,that.h);
          // }
      });
    }
  }
  contUpdate() {
    this.contFilter();
    this.contRender();
  }
  uninit () {
    this.ctx = null
    this.canvas = null
    this.shapeArray = []
  }
}

export default MikuCont
