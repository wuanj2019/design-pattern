// clone VS new
function Person(name) {
  this.name = name
}

Person.prototype.getName = function () {
  console.log(this.name);
  return this.name
}

const p1 = new Person('waj')
console.log(p1);

function ObjectFactory() {
  const obj = new Object()
  const Cstr = Array.prototype.shift.call(arguments)
  obj.__proto__ = Cstr.prototype
  const result = Cstr.apply(obj, arguments)
  return typeof result === 'object' ? result : obj
}

const p2 = ObjectFactory(Person, 'waj')
console.log(p2);

console.log({});
console.log(ObjectFactory(Object));

class Animal {
  constructor(name) {
    this.name = name
  }
  getName() {
    console.log(this.name);
    return this.name
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name)
  }
}

const d = new Dog('dog')
