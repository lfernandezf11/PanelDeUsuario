import { oneDay, oneYear } from './../utils/constants.js';

const bannerCookies = document.getElementById('cookie-banner');
const accept = document.getElementById('cookie-accept');
const reject= document.getElementById('cookie-reject');


//Estado inicial
bannerCookies.classList.add('active');

accept.addEventListener('click', () => {
    document.cookie = 'cookiesAccepted=true';
    changeExpireDate('cookiesAccepted', 'true', oneYear);
    bannerCookies.classList.remove('active');
});

reject.addEventListener('click', () => {
    document.cookie = 'cookiesAccepted=false';
    changeExpireDate('cookiesAccepted', 'false', oneDay);
    bannerCookies.classList.remove('active');
});

function setCookie(name, value, ms, path = "/", secure = false) {
  const maxAge = Math.floor(ms / 1000);
  document.cookie =
    `${name}=${encodeURIComponent(value)}; ` +
    `Max-Age=${maxAge}; path=${path}; SameSite=Lax` +
    (secure ? `; Secure` : ``);
}

export function changeExpireDate(cookieName, cookieValue, newTime) {
  let now = new Date();
  let time = now.getTime();
  let expireTime = time + newTime;
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

