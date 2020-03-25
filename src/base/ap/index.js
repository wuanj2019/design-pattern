// public sub

window._event = (function () {
  eventList = {}
  offlineEventList = {}

  function addSub(key, fn) {
    if (offlineEventList[key]) {
      const cb = offlineEventList[key].slice().shift()
      eventList[key] = []
      eventList[key].push(fn)
      cb.call(null, key)
      Reflect.deleteProperty(eventList, key)
      return
    }

    if (!eventList[key]) {
      eventList[key] = []
    }
    eventList[key].push(fn)
  }

  function removeSub(key, fn) {
    const subList = eventList[key]
    if (!subList) {
      return false
    }

    if (!fn) {
      subList.length = 0
      return true
    }

    const i = subList.indexOf(fn)
    if (i !== -1) {
      subList.splice(i, 1)
      return true
    }
  }

  function notify() {
    const key = Array.prototype.shift.call(arguments)
    const subList = eventList[key]

    if (!subList) {
      const olList = offlineEventList[key] = []
      Array.prototype.unshift.call(arguments, key)
      const args = arguments

      const cb = function () {
        notify.apply(null, args)
      }
      olList.push(cb)
      return
    }

    if (subList.length === 0) {
      return
    }

    for (const sub of subList) {
      sub.apply(null, arguments)
    }
  }

  return {
    addSub,
    removeSub,
    notify
  }
})()

const f1 = function () {
  console.log('f1', arguments);
}

const f2 = function () {
  console.log('f2', arguments);
}

// _event.addSub('e1', f1)
// _event.addSub('e1', f2)

// _event.notify('e1', 1, 2, 3)

// _event.removeSub('e1', f1)

// _event.notify('e1', 1, 2, 3, 4, 5)

// _event.notify('e2', 22222)
// _event.addSub('e2', f2)

// Promise

const p = new Promise(function (resolve, reject) {
  console.log(1);
  setTimeout(function () {
    console.log(2);
    resolve(4)
  }, 500)
  console.log(3);
})

p.then((ret) => { console.log(ret); })

class ProM {
  constructor(executor) {
    this.successList = []
    this.failList = []
    this.state = null

    const resolve = (val) => {
      if (this.state) {
        return false
      }
      this.state = true
      for (const fn of this.successList) {
        fn(val)
      }
    }
    const reject = (val) => {
      if (this.state) {
        return false
      }
      this.state = false
      this.failList.forEach(fn => {
        fn(val)
      });
    }

    executor(resolve, reject)
  }

  then(cb1, cb2) {
    // cb1 && this.successList.push(cb1)
    // cb2 && this.failList.push(cb1)
    return new ProM((resolve, reject) => {
      const cb1Wrap = (val) => {
        try {
          //执行第一个(当前的)Promise的成功回调,并获取返回值
          let x = cb1(val)
          //分类讨论返回值,如果是Promise,那么等待Promise状态变更,否则直接resolve
          x instanceof ProM ? x.then(resolve, reject) : resolve(x)
        } catch (error) {
          reject(error)
        }
      }
      this.successList.push(cb1Wrap)

    })
  }

  // catch(cb) { this.then(undefined, cb) }
}

const p2 = new ProM(function (resolve, reject) {
  console.log(1);
  setTimeout(function () {
    console.log(2);
    resolve(4444444444)
    // reject(555555555)
  }, 1000)
  console.log(3);
})

p2.then(ret => {
  console.log(ret);
  return 66666666
}).then(result => {
  console.log(result);
  return new ProM((resolve, reject) => {
    console.log('before gq4');
    setTimeout(function () {
      resolve('gq4')
    }, 500)
  })
}).then((res) => { console.log(res); })



