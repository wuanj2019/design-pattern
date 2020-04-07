// publish subscribe
window._event = {
  eventList: {},
  offLineEventList: {},

  addSub(key, fn) {
    if (this.offLineEventList[key]) {
      const notifyWrapCb = Array.prototype.shift.call(
        this.offLineEventList[key].slice()
      );
      this.eventList[key] = [];
      this.eventList[key].push(fn);
      notifyWrapCb.call(this);
      Reflect.deleteProperty(this.eventList[key], key);
      return;
    }

    if (!this.eventList[key]) {
      this.eventList[key] = [];
    }
    this.eventList[key].push(fn);
  },

  addOnceSub(key, fn) {
    const sub = function () {
      fn.apply(this, arguments);
      this.removeSub(key, sub);
    };
    this.addSub(key, sub);
  },

  removeSub(key, fn) {
    const subList = this.eventList[key];
    if (!subList) {
      return false;
    }

    if (!fn) {
      subList.length = 0;
      return true;
    }

    const i = subList.indexOf(fn);
    if (i !== -1) {
      subList.splice(i, 1);
    }
    return true;

    // for (let i = 0; i < subList.length; i++) {
    //   if (fn === subList[i]) {
    //     subList.splice(i, 1)
    //   }
    // }
  },

  notify() {
    const key = Array.prototype.shift.call(arguments);
    const subList = this.eventList[key];
    if (!subList) {
      this.offLineEventList[key] = [];
      Array.prototype.unshift.call(arguments, key);
      const args = arguments;
      const notifyWrapCb = function () {
        this.notify.apply(this, args);
      };
      this.offLineEventList[key].push(notifyWrapCb);
      return;
    }

    for (const sub of subList) {
      sub.apply(this, arguments);
    }
  },
};

const f1 = function () {
  console.log("f1", arguments);
};

const f2 = function () {
  console.log("f2", arguments);
};

const f3 = function () {
  console.log("f3", arguments);
};

const f4 = function () {
  console.log("f4", arguments);
};

const f5 = function () {
  console.log("f5", arguments);
};

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

let c = 0;

class MyPromise {
  constructor(executor) {
    c++;
    // console.log(c);
    this.c = c;
    this.state = "pending";
    this.value = undefined;
    this.fullFilledQueue = [];
    this.rejectedQueue = [];

    const resolve = (val) => {
      // console.log(this.c);
      const run = () => {
        if (this.state === "pending") {
          this.state = "fullFilled";
          this.value = val;
          for (const sub of this.fullFilledQueue) {
            sub(val);
          }
        }
      };
      setTimeout(run);
    };

    const reject = (val, c) => {
      const run = () => {
        if (this.state === "pending") {
          this.state = "rejected";
          this.value = val;
          for (const sub of this.rejectedQueue) {
            sub(val);
          }
        }
      };
      setTimeout(run);
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFullFilled, onRejected) {
    if (typeof onFullFilled !== "function") {
      onFullFilled = (val) => val;
    }
    if (typeof onRejected !== "function") {
      onRejected = (val) => {
        throw new Error(val);
      };
    }

    // typeof resolveFn !== "function" ? (resolveFn = (value) => value) : null;
    // typeof rejectFn !== "function"
    //   ? (rejectFn = (reason) => {
    //       throw new Error(reason instanceof Error ? reason.message : reason);
    //     })
    //   : null;

    return new MyPromise((resolve, reject) => {
      const onFull = (val) => {
        try {
          const ret = onFullFilled(val);
          ret instanceof MyPromise ? ret.then(resolve, reject) : resolve(ret);
        } catch (error) {
          reject(error.message);
        }
      };

      const onReject = (val) => {
        try {
          const ret = onRejected(val);
          ret instanceof MyPromise ? ret.then(resolve, reject) : reject(ret);
        } catch (error) {
          reject(error.message);
        }
      };
      this.fullFilledQueue.push(onFull);
      this.rejectedQueue.push(onReject);

      // switch (this.status) {
      //   case "pending":
      //     onRejected && this.fullFilledQueue.push(onFull);
      //     onRejected && this.rejectedQueue.push(onReject);
      //     break;
      //   case "fullFilled":
      //     onFull(this.state);
      //     break;

      //   case "rejected":
      //     onReject(this.state);
      //     break;

      //   default:
      //     break;
      // }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(cb) {
    return this.then(
      (val) => MyPromise.resolve(cb()).then(() => val),
      (val) =>
        MyPromise.reject(cb()).then(() => {
          throw val;
        })
    );
  }

  static resolve(val) {
    if (val instanceof MyPromise) {
      return val;
    }
    return new MyPromise((resolve, reject) => {
      resolve(val);
    });
  }

  static reject(val) {
    if (val instanceof MyPromise) {
      return val;
    }
    return new MyPromise((resolve, reject) => {
      reject(val);
    });
  }
}

new MyPromise((resolve, reject) => {
  setTimeout(() => {
    // reject("errrrrrrrrrrrrrrrrrrror");
    resolve(5);
  });
  // reject("error1");
  // resolve(5);
})
  .then((ret) => {
    console.log(ret);
    return new MyPromise((resolve, reject) => {
      // resolve(999999);
      // reject('999rrrrr')
      setTimeout(() => {
        resolve(8888);
      });
    });
  })
  .then((ret) => {
    console.log(ret);
    return 555555555;
  })
  .catch((e) => {
    console.log(e, "zzz--------------eeeeeeeeee");
    return 2;
  })
  .finally(
    () => {
      console.log("f1");
    },
    () => {
      console.log(ret, "fffffffffffff2");
    }
  )
  .then((ret) => {
    console.log(ret);
  });
