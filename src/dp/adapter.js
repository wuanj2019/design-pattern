const renderMap = function (map) {
  map.show(1, 2, 3, 4)
}

const googleMap = {
  display() {
    console.log('I am google map!', arguments, this);
  }
}

const baiduMap = {
  b: 1,
  show() {
    console.log('I am baidu map!', arguments, this);
  }
}

const googleMapAdapter = {
  a: 1,
  show() {
    return googleMap.display.apply(googleMap, arguments)
  }
}

renderMap(baiduMap)
renderMap(googleMapAdapter)