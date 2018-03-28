/* var isMobile = {
  Android: function () { return navigator.userAgent.match(/Android/i) },
  BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i) },
  iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i) },
  Opera: function () { return navigator.userAgent.match(/Opera Mini/i) },
  Windows: function () { return navigator.userAgent.match(/IEMobile/i) },
  any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()) }
} */
var isMobile = false
if (/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent)) {isMobile = true}

export default isMobile
