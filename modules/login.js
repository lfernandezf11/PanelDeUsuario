import { regUser, regPasswd } from './../utils/constants.js';
import { hashText } from './../utils/crypto.js';

let formEl = document.getElementById('login-view');
let userNameEl = document.getElementById('logUser');
let passwdEl = document.getElementById('logPass');
let submitBtnEl = document.getElementById('logSubmitBtn');

let nameValid = false;
let passwdValid = false;

const USERNAME_INVALID = 'El nombre de usuario debe tener al menos 3 caracteres';
const PASSWORD_INVALID = 'La contraseña debe tener 8 caracteres, una mayúscula y una minúscula';

userNameEl.addEventListener('blur', validateName);
passwdEl.addEventListener('blur', validatePassword);

function checkFullForm() {
  nameValid && passwdValid
    ? submitBtnEl.classList.remove('notAvailable')
    : submitBtnEl.classList.add('notAvailable');
}

function validateName() {
  nameValid = regUser.test(userNameEl.value.trim());
  userNameEl.className = nameValid ? 'success' : 'error';
  const small = userNameEl.parentNode.getElementsByTagName('small')[0];
  small.textContent = nameValid ? '' : USERNAME_INVALID;
  checkFullForm();
}

function validatePassword() {
  passwdValid = regPasswd.test(passwdEl.value.trim());
  passwdEl.className = passwdValid ? 'success' : 'error';
  const small = passwdEl.parentNode.getElementsByTagName('small')[0];
  small.textContent = passwdValid ? '' : PASSWORD_INVALID;
  checkFullForm();
}

formEl.addEventListener('submit', e => {
  e.preventDefault();
  if (!formEl.checkValidity()) {
    formEl.reportValidity();
    return;
  }
  console.log('Login válido');
});
