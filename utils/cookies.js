import { oneDay, oneYear } from './../utils/constants.js';

const bannerCookies = document.getElementById('cookie-banner');
const accept = document.getElementById('cookie-accept');
const reject= document.getElementById('cookie-reject');


//Estado inicial
const status = getCookie('cookiesAccepted'); 
if (status !== 'true') {
  bannerCookies.classList.add('active'); 
} else {
  bannerCookies.classList.remove('active');
}

accept.addEventListener('click', () => {
    setCookieWithExpireDate('cookiesAccepted', 'true', oneYear);
    bannerCookies.classList.remove('active');
});

reject.addEventListener('click', () => {
    setCookieWithExpireDate('cookiesAccepted', 'false', oneDay);
    bannerCookies.classList.remove('active');
});


export function setCookieWithExpireDate(cookieName, cookieValue, timeValidity) {
  let now = new Date();
  let time = now.getTime();
  let expireTime = time + timeValidity;
  now.setTime(expireTime);
  let cookieExpireDate = now.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + "; expires=" + cookieExpireDate;
}


export function getCookie(cookieName) {
  let nombre = cookieName + "=";
  let cookiesAlmacenadas = document.cookie.split(";");

  for (let i = 0; i < cookiesAlmacenadas.length; i++) {
    let cookie = cookiesAlmacenadas[i];
    while (cookie.charAt(0) == " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(nombre) == 0) {
      return cookie.substring(nombre.length, cookie.length);
    }
  }
  return "";
}

