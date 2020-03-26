class StrategyS {
  calSalary(salary) {
    return salary * 6
  }
}

class StrategyA {
  calSalary(salary) {
    return salary * 4
  }
}

class StrategyB {
  calSalary(salary) {
    return salary * 2
  }
}

class Context {
  constructor(strategy, salary) {
    this.strategy = strategy
    this.salary = salary
  }
  getSalary() {
    return this.strategy.calSalary(this.salary)
  }
}

let context = new Context(new StrategyS(), 10000)
console.log(context.getSalary());
context = new Context(new StrategyA(), 8000)
console.log(context.getSalary());
context = new Context(new StrategyB(), 6000)
console.log(context.getSalary());



function strategies() {
  this.SS = function (salary) {
    return salary * 10
  }

  this.S = function (salary) {
    return salary * 6
  }

  this.A = function (salary) {
    return salary * 4
  }

  this.B = function (salary) {
    return salary * 2
  }

  this.C = function (salary) {
    return salary * 1
  }
}
const strategyRef = new strategies()

const getSalary = function (level, salary) {
  return strategyRef[level](salary)
}

console.log(getSalary('SS', 20000));
console.log(getSalary('S', 10000));
console.log(getSalary('A', 8000));
console.log(getSalary('B', 6000));
console.log(getSalary('C', 2000));