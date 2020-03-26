[1, 2, 3, 4, 5].forEach((value, i) => {
  console.log(value, i);
})


Array.prototype.forE = function (fn) {
  const self = this
  for (let i = 0; i < self.length; i++) {
    if (fn.call(this, self[i], i) === false) {
      break
    }
  }
}

console.log(Array.prototype);

[1, 2, 3, 4, 5].forE((value, i) => {
  console.log(value, i);
  if (value === 3) {
    return false
  }
})

Array.prototype.forE.call({ '0': "a", "1": "b", 'length': 2 }, (value, i) => {
  console.log(value, i);
})