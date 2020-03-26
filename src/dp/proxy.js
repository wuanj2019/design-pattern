const Image = (function () {
  const img = document.createElement('img')
  const setImgSrc = function (url) {
    img.src = url
    document.body.appendChild(img)
  }
  return {
    setImgSrc
  }
})()


const ProxyImage = (function () {
  const proxyImg = document.createElement('img')
  proxyImg.onload = function () {
    Image.setImgSrc(this.src)
  }
  const proxySetImg = function (url) {
    proxyImg.src = url
    Image.setImgSrc('./base/dp/30.gif')
  }

  return {
    proxySetImg
  }
})()

ProxyImage.proxySetImg('https://images.pexels.com/photos/220201/pexels-photo-220201.jpeg?cs=srgb&dl=pexels-220201.jpg&fm=jpg')