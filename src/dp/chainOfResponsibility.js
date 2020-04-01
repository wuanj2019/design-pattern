Function.prototype.after = function (fn) {
  const self = this
  return function () {
    let result = null
    result = self.apply(this, arguments)
    if (result === 'next') {
      result = fn.apply(this, arguments)
    }
    return result
  }
}

let f1 = function (value) {
  if (value > 80) {
    console.log(1, value);
  } else {
    return 'next'
  }
}

let f2 = function (value) {
  if (value > 60) {
    console.log(2, value);
  } else {
    return 'next'
  }
}

let f3 = function (value) {
  if (value > 50) {
    console.log(3, value);
  } else {
    console.log('ending!');
  }
}


f1 = f1.after(f2).after(f3)

f1(90)
f1(70)
f1(60)
f1(50)



