// this, 闭包, 高阶函数

function Person(name) {
  this.name = name
  // return null
  return function () {
    console.log('re');
  }
  return [1, 2, 3]
}

console.log(new Person('waj'));

Function.prototype.bind1 = function () {
  const _self = this
  const context = Array.prototype.shift.call(arguments)
  const args = arguments
  return function () {
    return _self.apply(context, Array.prototype.concat.call(args, Array.prototype.slice.call(arguments)))
  }
}

const getId = document.getElementById.bind1(document)
console.log(getId('app'));

// closure
const btnNodes = document.querySelectorAll('button')

for (let i = 0; i < btnNodes.length; i++) {
  btnNodes[i].onclick = function () {
    console.log(i);
  }
}


// 高阶函数
Function.prototype.before = function (bf) {
  const _self = this
  console.log(this);
  return function () {
    bf.apply(this, arguments)
    return _self.apply(this, arguments)
  }
}

function throttle(fn, delayTime = 500, immediate = false) {
  let timer = null
  return function () {
    const context = this
    const args = arguments

    if (immediate) {
      immediate = false
      return fn.apply(context, args)
    }

    if (timer) {
      return false
    }

    timer = setTimeout(function () {
      clearTimeout(timer)
      timer = null
      return fn.apply(context, args)
    }, delayTime)
  }
}


window.onmousemove = throttle(function (params) {
  console.log('onresize!');
}, 1000, true)

