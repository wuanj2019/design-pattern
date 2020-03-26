class Love {
  constructor() {
    this.unique = true
  }
  getUnique() {
    return this.unique
  }
}


// class Singleton1 {
//   static instance = null
//   static getInstance(C) {
//     if (!this.instance) {
//       this.instance = new C()
//     }
//     return this.instance
//   }
//   constructor() {
//   }

//   getInfo() {
//     return {
//       msg: '信息'
//     }
//   }
// }


// console.log(Singleton1.getInstance(Love));
// console.log(Singleton1.getInstance(Love));
// console.log(Singleton1.getInstance(Love) === Singleton1.getInstance(Love));
// console.log(Singleton1.instance);

// function Singleton2() { }
// Singleton2.instance = null
// Singleton2.getInstance = function (C) {
//   if (!Singleton2.instance) {
//     return Singleton2.instance = new C()
//   }
//   return Singleton2.instance
// }
// Singleton2.prototype.getInfo = function () {
//   return {
//     msg: '信息'
//   }
// }


// console.log(Singleton2.getInstance(Love));
// console.log(Singleton2.getInstance(Love));
// console.log(Singleton2.getInstance(Love) === Singleton2.getInstance(Love));
// console.log(Singleton2.instance);


// const getInstance3 = (
//   function () {
//     let instance = null
//     return function (C) {
//       if (!instance) {
//         return instance = new C()
//       }
//       return instance
//     }
//   }
// )()

// console.log(getInstance3(Love));
// console.log(getInstance3(Love));
// console.log(getInstance3(Love) === getInstance3(Love));


// class Singleton4 {
//   static instance = null
//   constructor() {
//     if (!Singleton4.instance) {
//       return Singleton4.instance = this
//     }
//     return Singleton4.instance
//   }
//   getL() { }
// }

// console.log(new Singleton4());
// console.log(new Singleton4() === new Singleton4());


// const ProxySingleton = (function () {
//   let instance = null
//   return function (params) {
//     if (!instance) {
//       return instance = new Love(params)
//     }
//     return instance
//   }
// })()

// console.log(ProxySingleton() === ProxySingleton());

const proxyLazySingleton = function (create) {
  let instance = null
  return function () {
    // if (!instance) {
    //   return instance = create.apply(this, arguments)
    // }
    // return instance
    return instance ? instance : (instance = create.apply(this, arguments))
  }
}

function create() {
  return document.createElement('div')
}

// 单例
const getInstance5 = proxyLazySingleton(create)
console.log(getInstance5());
console.log(getInstance5() === getInstance5());

function callOne() {
  console.log('I am called!!!');
  return 1
}

// 扩展, 只执行一次的操作
const getInstance6 = proxyLazySingleton(callOne)
getInstance6();
getInstance6();
getInstance6();
getInstance6();
getInstance6();
console.log(getInstance6() === getInstance6());
