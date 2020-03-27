const door = {
  open() {
    console.log('door is opening!');
  }
}

const light = {
  lighting() {
    console.log('light is lighting!');
  }
}

const xi = {
  show() {
    console.log('xi is showing!');
  }
}

const command = function (receiver, m) {
  return {
    execute() {
      receiver[m]()
    }
  }
}

const doorCommand = command(door, 'open')
const lightCommand = command(light, 'lighting')
const xiCommand = command(xi, 'show')

doorCommand.execute()
lightCommand.execute()
xiCommand.execute()
