import { showView, showMessage } from '../utils/dom.js';
import { regUser, regPasswd, oneDay } from './../utils/constants.js';
import { hashText } from './../utils/crypto.js';
import { changeExpireDate } from '../utils/cookies.js';

const formEl = document.getElementById('login-view');
const userNameEl = document.getElementById('logUser');
const passwdEl = document.getElementById('logPass');
const submitBtnEl = document.getElementById('logSubmitBtn');

const goToRegister = document.getElementById('goToRegisterBtn');

// Estado inicial
userNameEl.classList.remove ('error', 'success');
passwdEl.classList.remove('error', 'success');

let nameValid = false;
let passwdValid = false;

userNameEl.addEventListener('blur', validateName);
passwdEl.addEventListener('blur', validatePassword);

goToRegister.addEventListener('click', () => showView('register-view'));


/* Funciones de validación -----------------------------------*/
function checkFullForm() {
  nameValid && passwdValid
    ? submitBtnEl.classList.remove('notAvailable')
    : submitBtnEl.classList.add('notAvailable');
}

function validateName() {
  nameValid = regUser.test(userNameEl.value.trim());
  checkFullForm();
}

function validatePassword() {
  passwdValid = regPasswd.test(passwdEl.value.trim());
  checkFullForm();
}

/* MANEJO DE LOGIN --------------------------------*/
// Método contenido en crypto.js (lo personalizamos aquí)
// Asíncrona, utiliza recursos externos (crypto)
formEl.addEventListener('click', async () => {
  e.preventDefault();
  if (!formEl.checkValidity()) {
    formEl.reportValidity();
    return;
  }

  const username = userNameEl.value.trim();
  const password = passwdEl("logPass").value;

  const users = JSON.parse(localStorage.getItem("users") || "{}");
  const user = users[username];

  if (!user) {
    showMessage("❌ Usuario no encontrado");
    return;
  }

  const hash = await hashText(password + user.salt);

  if (hash === user.hash) {
    document.cookie = 'username=' + username;
    changeExpireDate('username', username, oneDay);
    showView('panel-view');
  } else {
    userNameEl.classList.add ('error');
    passwdEl.classList.add('error');
    showMessage("❌ Usuario o contraseña incorrectos");
  }
});

