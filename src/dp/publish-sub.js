var customEvent = {
  eventList: {},
  offlineEventList: {},

  addSub(key, fn) {
    if (this.offlineEventList[key]) {
      const notifyCb = this.offlineEventList[key].slice().pop()
      this.eventList[key] = []
      this.eventList[key].push(fn)
      notifyCb.call(this)
      Reflect.deleteProperty(this.eventList[key], key)
      return
    }

    if (!this.eventList[key]) {
      this.eventList[key] = []
    }
    this.eventList[key].push(fn)
  },

  addSubOnce(key, fn) {
    if (!this.eventList[key]) {
      this.eventList[key] = []
    }
    const fnCb = function () {
      fn.apply(this, arguments)
      this.removeSub(key, fnCb)
    }

    this.eventList[key].push(fnCb)
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

    for (let i = 0; i < subList.length; i++) {
      if (fn === subList[i]) {
        subList.splice(i, 1)
        return true
      }
    }
  },

  notify() {
    const key = Array.prototype.shift.call(arguments)
    const subList = this.eventList[key]

    if (!subList) {
      this.offlineEventList[key] = []
      Array.prototype.unshift.call(arguments, key)
      const args = arguments

      const notifyCb = function () {
        this.notify.apply(this, args)
      }
      this.offlineEventList[key].push(notifyCb)
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


customEvent.addSub('k1', f1)
customEvent.addSub('k1', f2)
customEvent.addSubOnce('k1', f3)

customEvent.notify('k1', 1, 2, 3, 4)
console.log('---------------notify k1-------------------');

customEvent.removeSub('k1', f1)
customEvent.notify('k1', 1, 2, 3, 4)
console.log('---------------notify k1-------------------');

customEvent.notify('k2', 1, 2)
console.log('---------------notify k2-------------------');

customEvent.addSub('k2', f3)

customEvent.addSub('k2', f2)

