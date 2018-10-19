import Util from './util'
class MikuEle {
    constructor(options) {
        this.strail = options.strail;
        this.trails = options.trails;
        this.ttrail = null;
        this.ctrail = null;
        this.tidx = 0;
        this.ctime = 0;
        this.ttime = 0;
        this.isEnd = false;
        this.switchTrail();
    }
    switchTrail() {
        if (this.tidx > 0) {
            this.strail = this.trails[this.tidx - 1];
        }
        this.ttrail = this.trails[this.tidx];
        this.ctrail = JSON.parse(JSON.stringify(this.strail));
        this.ctime = 0;
        this.ttime = this.ttrail.t;
        this.dtime = 0;
        this.isdelay = false;
        if (this.ttrail.dt) {
            this.dtime = this.ttrail.dt;
            this.isdelay = true;
        }
    }
    calcTrail() {
        if(this.isdelay) return;
        for (let i in this.ctrail) {
            let s = this.strail[i];
            if (!this.ttrail[i] && this.ttrail[i] != 0) this.ttrail[i] = s;
            let t = this.ttrail[i];
            if (s == t) continue;
            this.ctrail[i] = Util.getCurValue('linear', s, t, this.ctime, this.ttime);
        }
    }
    renderTime() {
        this.ctime++;
        if (this.isdelay) {
            if (this.ctime >= this.dtime) {
                this.ctime = 0;
                this.isdelay = false;
            }
            return;
        }
        if (this.ctime >= this.ttime) {
            this.tidx++;
            if (this.tidx >= this.trails.length) {
                console.log('end');
                this.tidx = 0;
                this.isEnd = true;
            } else {
                this.switchTrail();
            }
        }
    }

}

class MikuRect extends MikuEle {
    constructor(options) {
        super(options);
        this.type = options.type;
        this.isFill = options.isFill;
        this.ctx = options.ctx;
        this.count = options.count;
    }
    renderTrail() {
        this.ctx.save();
        this.ctx.translate(this.ctrail.x, this.ctrail.y);
        if (this.ctrail.s != 1) this.ctx.scale(this.ctrail.s, this.ctrail.s);
        if (this.ctrail.rot != 0) this.ctx.rotate(this.ctrail.rot);
        switch (this.type) {
            case 'rect':
                if (this.isFill) {
                    this.ctx.fillStyle = this.ctrail.c;
                    this.ctx.fillRect(-this.ctrail.r, -this.ctrail.r, this.ctrail.r * 2, this.ctrail.r * 2);
                } else {
                    this.ctx.strokeStyle = this.ctrail.c;
                    this.ctx.strokeRect(-this.ctrail.r, -this.ctrail.r, this.ctrail.r * 2, this.ctrail.r * 2);
                }
                break;
            case 'polygon':
                let points = createPoints(false, this.count, this.ctrail.r);
                this.ctx.beginPath();
                points.forEach((cv, idx) => {
                    let x = cv.x;
                    let y = cv.y;
                    if (idx == 0) {
                        this.ctx.moveTo(x, y);
                    } else {
                        this.ctx.lineTo(x, y);
                    }
                });
                this.ctx.closePath();
                if (this.isFill) {
                    this.ctx.fillStyle = this.ctrail.c;
                    this.ctx.fill();
                } else {
                    this.ctx.strokeStyle = this.ctrail.c;
                    this.ctx.stroke();
                }
                break;
            case 'arc':
                this.ctx.beginPath();
                this.ctx.arc(0, 0, this.ctrail.r, 0, Math.PI * 2);
                this.ctx.closePath();

                if (this.isFill) {
                    this.ctx.fillStyle = this.ctrail.c;
                    this.ctx.fill();
                } else {
                    this.ctx.strokeStyle = this.ctrail.c;
                    this.ctx.stroke();
                }
                break;
                break;
        }
        this.ctx.restore();
    }
    update() {
        if (this.isEnd) return;
        this.calcTrail();
        this.renderTrail();
        this.renderTime();
    }
}

function createPoints(random, count, r = 0, w = 0, h = 0) {
    let arr = [];
    if (random) {
        for (let i = 0; i < count; i++) {
            let x = Util.getRandomCount(0, w);
            let y = Util.getRandomCount(0, h);
            arr.push({ x, y });
        }
    } else {
        let pera = Math.PI * 2 / count;
        for (let i = 0; i < count; i++) {
            let a = pera * i;
            let x = r * Math.cos(a);
            let y = r * Math.sin(a);
            arr.push({ x, y });
        }
    }
    return arr;
}

export {MikuRect}
