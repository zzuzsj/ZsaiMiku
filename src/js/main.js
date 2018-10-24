import MikuBack from './back'
import MikuAudio from './audio'
import MikuCont from './cont'
import { BACK_LINES, SHOW_LINES } from './res'

import '../css/reset.css'
import '../css/main.less'

let bw = Math.floor(window.innerWidth)
let bh = Math.floor(window.innerHeight)
let board = document.getElementById('board')
let container = document.getElementsByClassName('boxContainer')[0]
let detail = document.getElementsByClassName('detailContainer')[0]

board.width = bw
board.height = bh
let bctx = board.getContext('2d')

let mikuAudio = new MikuAudio()
let back = new MikuBack(Math.floor(bw / 2), Math.floor(bh / 2))
let cont = new MikuCont(bw, bh)
let backas = addBackAuido()
let bindex = 0
let showas = addShowAudio()
let detailTimer = null
let detailShowing = true

let backEnable = true
let showEnable = true
let backSwitch = document.getElementById('backSwitch')
let showSwitch = document.getElementById('showSwitch')

let backTimer = null

addBox()
back.init()
renderCtx()

setInterval(() => {
  back.addSwitch(60)
}, 5000)

let spaceEnd = true

let lastIndex = 0
let mouseDown = false
container.addEventListener('mousedown', e => {
  startBack()
  hideDetail()
  clearDetail()
  fadeOut(e.target)
  let sindex = e.target.getAttribute('data-show')
  if (sindex === lastIndex) return
  // showas[sindex].audio.play()
  if (showEnable) mikuAudio.play(showas[sindex], `s${sindex}`)
  let stype = sindex * 1 % 8 + 1
  cont.addShape(`type_${stype}`)
  lastIndex = sindex
  mouseDown = true
})
container.addEventListener('mousemove', e => {
  if (!mouseDown) return
  fadeOut(e.target)
  if (!spaceEnd) return
  let sindex = e.target.getAttribute('data-show')
  if (sindex === lastIndex) return
  // showas[sindex].audio.play()
  if (showEnable) mikuAudio.play(showas[sindex], `s${sindex}`)
  lastIndex = sindex
  let stype = sindex * 1 % 8 + 1
  cont.addShape(`type_${stype}`)
  spaceEnd = false
  runSpaceTimer()
})
container.addEventListener('mouseup', e => {
  lastIndex = 0
  mouseDown = false
  detailTimer = setTimeout(() => {
    showDetail()
  }, 3000)
})

container.addEventListener('touchstart', e => {
  startBack()
  hideDetail()
  clearDetail()
  let target = e.targetTouches[0].target
  fadeOut(target)
  let sindex = target.getAttribute('data-show')
  if (sindex === lastIndex) return
  // showas[sindex].audio.play()
  if (showEnable) mikuAudio.play(showas[sindex], `s${sindex}`)
  let stype = sindex * 1 % 8 + 1
  cont.addShape(`type_${stype}`)
  lastIndex = sindex
  mouseDown = true
})
container.addEventListener('touchmove', e => {
  e.preventDefault()
  if (!mouseDown) return
  let {clientX, clientY} = e.changedTouches[0]
  let target = document.elementFromPoint(clientX , clientY)
  fadeOut(target)
  if (!spaceEnd) return
  let sindex = target.getAttribute('data-show')
  if (sindex === lastIndex) return
  // showas[sindex].audio.play()
  if (showEnable) mikuAudio.play(showas[sindex], `s${sindex}`)

  lastIndex = sindex
  let stype = sindex * 1 % 8 + 1
  cont.addShape(`type_${stype}`)
  spaceEnd = false
  runSpaceTimer()
})
container.addEventListener('touchend', e => {
  lastIndex = 0
  mouseDown = false
  detailTimer = setTimeout(() => {
    showDetail()
  }, 3000)
})

backSwitch.addEventListener('click', () => {
  changeEnable(true)
})
showSwitch.addEventListener('click', () => {
  changeEnable(false)
})


function renderCtx () {
  clearFrame()
  renderBack()
  renderCont()
  requestAnimationFrame(renderCtx)
}

function clearFrame () {
  bctx.clearRect(0, 0, bw, bh)
}

function renderBack () {
  bctx.drawImage(back.canvas, 0, 0, bw, bh)
}

function renderCont () {
  cont.contUpdate()
  bctx.drawImage(cont.canvas, 0, 0, bw, bh)
}

function addBox () {
  let count = 32
  for (let i = 0; i < count; i++) {
    let div = document.createElement('div')
    div.className = bw > bh ? 'box_h' : 'box_v'
    div.setAttribute('data-show', i)
    container.appendChild(div)
  }
}

function addBackAuido () {
  let arr = []
  for (let i in BACK_LINES) {
    let src = BACK_LINES[i]
    let obj = {}
    obj.index = i
    obj.audio = new Audio(src)
    obj.buffer = base64ToArrayBuffer(src)
    arr.push(obj)
  }
  return arr
}

function addShowAudio () {
  let arr = []
  for (let i in SHOW_LINES) {
    let src = SHOW_LINES[i]
    let obj = {}
    obj.index = i
    obj.audio = new Audio(src)
    obj.buffer = base64ToArrayBuffer(src)
    arr.push(obj)
  }
  return arr
}

function runSpaceTimer () {
  if (spaceEnd) return
  let timer = setTimeout(() => {
    spaceEnd = true
  }, 200)
}

function fadeOut (target) {
  if (target.timer) clearInterval(target.timer)
  target.style.opacity = 1
  let tt = 30
  let ct = 0
  target.timer = setInterval(() => {
    ct++
    let opa = ((tt - ct) / tt).toFixed(2)
    target.style.opacity = opa
    if (ct >= 30) {
      ct = 0
      clearInterval(target.timer)
      target.style.opacity = 0
      target.timer = null
    }
  }, 30)
}

function base64ToArrayBuffer (base64) {
  var binary_string = window.atob(base64.split(',')[1])
  var len = binary_string.length
  var bytes = new Uint8Array(len)
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i)
  }
  return bytes.buffer
}

function showDetail () {
  if (detailShowing) return
  detail.style.display = 'block'
  detailShowing = true
}
function hideDetail () {
  if (!detailShowing) return
  detail.style.display = 'none'
  detailShowing = false
}
function clearDetail () {
  if (detailTimer) {
    clearTimeout(detailTimer)
    detailTimer = null
  }
}

function changeEnable (back) {
  if (back) {
    backEnable = !backEnable
    backSwitch.innerHTML = backEnable ? 'On' : 'Off'
    if (backEnable) {
      startBack()
    }else {
      endBack()
    }
  }else {
    showEnable = !showEnable
    showSwitch.innerHTML = showEnable ? 'On' : 'Off'
  }
}
function startBack () {
  if (!backEnable || backTimer) return
  backTimer = setInterval(() => {
    // backas[bindex].audio.play()
    mikuAudio.play(backas[bindex], `b${bindex}`)
    bindex++
    if (bindex >= backas.length) bindex = 0
  }, 200)
}
function endBack () {
  if (backTimer) {
    clearInterval(backTimer)
    backTimer = null
  }
}
