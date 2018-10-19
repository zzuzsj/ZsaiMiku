import MikuBack from './back'
import MikuAudio from './audio'
import MikuCont from './cont'
import { BACK_LINES, SHOW_LINES } from './res'

import '../css/reset.css'
import '../css/main.less'

let bw = Math.floor(window.innerWidth);
let bh = Math.floor(window.innerHeight);
let board = document.getElementById('board');
let container = document.getElementsByClassName('boxContainer')[0];

board.width = bw;
board.height = bh;
let bctx = board.getContext('2d');

let back = new MikuBack(Math.floor(bw / 2), Math.floor(bh / 2));
let cont = new MikuCont(bw, bh);
let backas = addBackAuido();
let bindex = 0;
let showas = addShowAudio();

addBox();
back.init();
renderCtx();

setInterval(() => {
    back.addSwitch(60);
}, 2000);
setInterval(() => {
    backas[bindex].audio.play();
    // bindex = Math.floor(Math.random()*backas.length);
    bindex++;
    if (bindex >= backas.length) bindex = 0;
}, 200);

board.addEventListener('click', () => {
    cont.addShape('type_4');
})
let lastIndex = 0;
let mouseDown = false;
container.addEventListener('mousedown', e => {
    let sindex = e.target.getAttribute('data-show');
    if (sindex === lastIndex) return;
    showas[sindex].audio.play();
    lastIndex = sindex;
    let stype = sindex * 1 % 4 + 1;
    cont.addShape(`type_${stype}`);
    lastIndex = sindex;
    mouseDown = true;
})
container.addEventListener('mousemove', e => {
    if (!mouseDown) return;
    let sindex = e.target.getAttribute('data-show');
    if (sindex === lastIndex) return;
    showas[sindex].audio.play();
    lastIndex = sindex;
    let stype = sindex * 1 % 4 + 1;
    cont.addShape(`type_${stype}`);
})
container.addEventListener('mouseup', e => {
    lastIndex = 0;
    mouseDown = false;
})

function renderCtx() {
    clearFrame();
    renderBack();
    renderCont();
    requestAnimationFrame(renderCtx);
}

function clearFrame() {
    bctx.clearRect(0, 0, bw, bh);
}

function renderBack() {
    bctx.drawImage(back.canvas, 0, 0, bw, bh);
}

function renderCont() {
    cont.contUpdate();
    bctx.drawImage(cont.canvas, 0, 0, bw, bh);
}

function addBox() {
    let count = 32;
    for (let i = 0; i < count; i++) {
        let div = document.createElement('div');
        div.className = "box";
        div.setAttribute('data-show', i);
        container.appendChild(div);
    }
}

function addBackAuido() {
    let arr = [];
    for (let i in BACK_LINES) {
        let src = BACK_LINES[i];
        let obj = {};
        obj.index = i;
        obj.audio = new MikuAudio(src);
        arr.push(obj);
    }
    return arr;
}

function addShowAudio() {
    let arr = [];
    for (let i in SHOW_LINES) {
        let src = SHOW_LINES[i];
        let obj = {};
        obj.index = i;
        obj.audio = new MikuAudio(src);
        arr.push(obj);
    }
    return arr;
}