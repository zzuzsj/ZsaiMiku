
class Util {
  static getDomWH (query) {
    let w = 0
    let h = 0
    if (query && query != '') {
      let dom = document.querySelector(query)
      if (dom) {
        w = dom.offsetWidth
        h = dom.offsetHeight
      }
    }else {
      w = window.innerWidth
      h = window.innerHeight
    }
    return {
    w,h}
  }
  static getRandomCount (start, end) {
    if(end<=start) return start;
    return Math.round(start + Math.random() * (end - start))
  }
  static getRandomValue (arr, count, se) {
    let s = 0
    let e = 0
    if (!Array.isArray(arr)) {
      let a = []
      for (let i = 0;i <= arr;i++) {
        a.push(i)
      }
      arr = a
    }
    if (se) {
      e = arr.splice(arr.length - 1, 1)[0]
      s = arr.splice(0, 1)[0]
      count -= 2
    }
    arr.sort(() => {
      return Math.random() < 0.5 ? -1 : 1;})
    if (arr.length < count) {
      for (let i = arr.length;i <= count;i++) {
        arr.push(arr[i % arr.length])
      }
    }else {
      arr = arr.splice(0, count)
    }
    if (se) {
      arr = [s, ...arr, e]
    }
    return arr
  }
  static getRandomColor () {
    var colorValue = '7,8,9,A,B,C,D,E,F';
    var colorArray = colorValue.split(',')
    var color = '#'; 
    for (var i = 0;i < 6;i++) {
      color += colorArray[Math.floor(Math.random() * colorArray.length)]
    }
    return color
  }
  static getPrepareImgs (urls, callback) {
    let errCount = 0
    let preCount = 0
    urls.map(cv => {
      let img = new Image()
      img.src = cv.url
      img.onload = () => {
        preCount++
        cv.img = img
        if (preCount >= urls.length) {
          callback(errCount, urls)
        }
      }
      img.onerror = () => {
        errCount++
        preCount++
        cv.img = null
        if (preCount >= urls.length) {
          callback(errCount, urls)
        }
      }
    })
  }
  static getCurValue (stype, sv, ev, ct, tt) {
    let val = 0
    switch (stype) {
      case 'linear':
        val = ((tt - ct) * sv + ct * ev) / tt
        break
      default:
        break
    }
    return val
  }
}

export default Util