function remSize() {
  var deviceWidth = document.documentElement.clientWidth || window.innerWidth
  if (deviceWidth >= 750) {
    deviceWidth = 750
  }
  if (deviceWidth <= 320) {
    deviceWidth = 320
  }

  /*  document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px'

  document.querySelector('body').style.fontSize = 0.3 + 'rem'
  var app = document.getElementById('app')
  app.style.padding = '0.3rem' */

  //规定rem的大小
  //750px -->1rem=100px,375px -->1rem=50px
  document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px'
  //字体大小
  document.querySelector('body').style.fontSize = 0.3 + 'rem'
  /* var app = document.getElementById('app')
  app.style.paddingTop = '0.3rem'
  app.style.paddingLeft = '0.3rem'
  app.style.paddingRight = '0.3rem' */
}

remSize()

window.onresize = function () {
  remSize()
}
