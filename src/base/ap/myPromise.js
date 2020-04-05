// publish subscribe

window._event = {
  eventList: {},
  offLineEventList: {},

  addSub(key, fn) {
    if (this.offLineEventList[key]) {
      const notifyWrapCb = Array.prototype.shift.call(this.offLineEventList[key].slice())
      this.eventList[key] = []
      this.eventList[key].push(fn)
      notifyWrapCb.call(this)
      Reflect.deleteProperty(this.eventList[key], key)
      return
    }

    if (!this.eventList[key]) {
      this.eventList[key] = []
    }
    this.eventList[key].push(fn)
  },

  addOnceSub(key, fn) {
    const sub = function () {
      fn.apply(this, arguments)
      this.removeSub(key, sub)
    }
    this.addSub(key, sub)
  },

  removeSub(key, fn) {
    const subList = this.eventList[key]
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
    }
    return true

    // for (let i = 0; i < subList.length; i++) {
    //   if (fn === subList[i]) {
    //     subList.splice(i, 1)
    //   }
    // }
  },

  notify() {
    const key = Array.prototype.shift.call(arguments)
    const subList = this.eventList[key]
    if (!subList) {
      this.offLineEventList[key] = []
      Array.prototype.unshift.call(arguments, key)
      const args = arguments
      const notifyWrapCb = function () {
        this.notify.apply(this, args)
      }
      this.offLineEventList[key].push(notifyWrapCb)
      return
    }

    for (const sub of subList) {
      sub.apply(this, arguments)
    }
  }

}

const f1 = function () {
  console.log('f1', arguments);
}

const f2 = function () {
  console.log('f2', arguments);
}

const f3 = function () {
  console.log('f3', arguments);
}

const f4 = function () {
  console.log('f4', arguments);
}

const f5 = function () {
  console.log('f5', arguments);
}

// _event.addSub('e1', f1)
// _event.addSub('e1', f2)
// _event.addSub('e1', f3)
// _event.addSub('e1', f3)
// _event.addSub('e1', f4)
// _event.addSub('e1', f5)

// _event.notify('e1', 'eeeeeeeeeeeeee1')

// _event.removeSub('e1', f3)
// _event.removeSub('e1', f3)

// _event.notify('e1', 33333333)



// _event.notify('e2', 'e222222222222')
// _event.addSub('e2', f3)
// _event.addSub('e2', f3)
// _event.addSub('e2', f4)
// _event.addSub('e2', f5)

// console.log('once !!!!!!');

// _event.addOnceSub('e2', f1)

// console.log('-----------------------');

// _event.addOnceSub('e3', f3)

// _event.notify('e3', 'e3e3e3e3e3e3')
// _event.notify('e3', 'e3e3e3e3e3e3')
// _event.notify('e3', 'e3e3e3e3e3e3')



// promise
// new Promise((resolve, reject) => {
//   console.log(4);
//   setTimeout(function () {
//     console.log(1);
//     resolve(2)
//   })
// }).then((ret) => {
//   console.log(ret);
//   return 3
// }, () => { }).then((ret) => {
//   console.log(ret);
// })

// console.log('----------------------');

class MyPromise {

  constructor(executor) {
    this.state = 'pending'
    this.fullFilledQueue = []
    this.rejectedQueue = []

    const resolve = (val) => {
      const run = () => {
        if (this.state === "pending") {
          this.state = "fullFilled"
          for (const sub of this.fullFilledQueue) {
            sub(val)
          }
        }
      }
      setTimeout(run)
    }

    const reject = (val) => {
      if (this.state === "pending") {
        this.state = "rejected"
        for (const sub of this.rejectedQueue) {
          sub(val)
        }
      }
    }

    console.log(arguments);


    executor(resolve, reject)
  }

  then(onFullFilled, onRejected) {
    console.log(arguments);
    // onFullFilled && this.fullFilledQueue.push(onFullFilled)
    return new MyPromise((resolve, reject) => {
      const onFull = (val) => {
        const ret = onFullFilled(val)
        resolve(ret)
      }
      this.fullFilledQueue.push(onFull)
    })
  }
}

new MyPromise((resolve, reject) => {
  console.log(this);
  console.log(1);
  // setTimeout(() => {
  //   resolve(5)
  // })
  resolve(5)
  console.log(3);
}).then((val) => {
  console.log(val);
  return 66
}).then((ret) => {
  console.log(ret);
})

