const macroCommand = function () {
  return {
    commandList: [],
    add(command) {
      this.commandList.push(command)
    },
    execute() {
      for (const command of this.commandList) {
        command.execute()
      }
    }
  }
}

const xiShowCommand = {
  execute() {
    console.log('xi showing');
  }
}

const xi1ShowCommand1 = {
  execute() {
    console.log('xi1 showing1');
  }
}


const xi1ShowCommand2 = {
  execute() {
    console.log('xi1 showing2');
  }
}

const xi1ShowCommand3 = {
  execute() {
    console.log('xi1 showing3');
  }
}

const xi1ShowCommand = macroCommand()
xi1ShowCommand.add(xi1ShowCommand1)
xi1ShowCommand.add(xi1ShowCommand2)
xi1ShowCommand.add(xi1ShowCommand3)


const xi2ShowCommand = {
  execute() {
    console.log('xi2 showing');
  }
}

const macro1Command = macroCommand()
macro1Command.add(xiShowCommand)
macro1Command.add(xi1ShowCommand)
macro1Command.add(xi2ShowCommand)

macro1Command.execute()




