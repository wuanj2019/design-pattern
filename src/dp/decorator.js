function before(fn, beforeFn) {
  return function () {
    beforeFn.apply(this, arguments)
    return fn.apply(this, arguments)
  }
}

function after(fn, afterFn) {
  return function () {
    let ret = null
    ret = fn.apply(this, arguments)
    afterFn.apply(this, arguments)
    return ret
  }
}

let f1 = function () {
  console.log('f1', arguments, this);
}

f1 = before(f1, function () {
  console.log('before', arguments, this);
})

f1.call({ a: 1 }, 1, 2)

f1 = after(f1, function () {
  console.log('after');
})

f1.call({ b: 2 }, 2, 3, 4)