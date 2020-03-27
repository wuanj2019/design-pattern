
Object.prototype.i = function () {
  console.log('I am in object prototype!');
  console.log(this);
  if (this.created()) {
    console.log(arguments);
  }
}


const a = {
  name: 'a',
  created() {
    return false
  },
  li() { }
}

a.i(1, 2, 3, 4, 5)