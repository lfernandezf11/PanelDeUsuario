import { regUser, regPasswd, regTel, regPCode } from './../utils/constants.js';
import { hashText, generateSalt } from './../utils/crypto.js';

let formEl = document.getElementById('register-view');
let userNameEl = document.getElementById('user');
let passwdEl = document.getElementById('password');
let tlfEl = document.getElementById('tlf');
let pCodeEl= document.getElementById('pCode');
let legalAgeEl = document.getElementById('legalAge');
let ageEl = document.getElementById('age').parentElement; //Como el input age está contenido en el div inputInline, hacemos referencia a él para controlar el display de todo el bloque.
let submitBtnEl = document.getElementById('submitBtn');

let nameValid = false;
let passwdValid = false;
let tlfValid= false;
let pCodeValid = false;

const USERNAME_INVALID = 'El nombre de usuario debe tener al menos 3 caracteres';
const PASSWORD_INVALID = 'La contraseña debe tener 8 caracteres, una mayúscula y una minúscula';
const TELEPHONE_INVALID = 'El número de teléfono debe tener 9 dígitos.';
const POSTALCODE_INVALID = 'El código postal debe tener 5 dígitos';

userNameEl.addEventListener('blur', validateName);
passwdEl.addEventListener('blur', validatePassword);
tlfEl.addEventListener('blur', validateTelephone);
pCodeEl.addEventListener('blur', validatePostalCode);

legalAgeEl.addEventListener('change', () => {
  ageEl.style.display = legalAgeEl.checked ? 'flex' : 'none';
});

function checkFullForm() {
  nameValid && passwdValid && tlfValid && pCodeValid
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
  passwdValid = regPasswd.test(passwdEl.value);
  passwdEl.className = passwdValid ? 'success' : 'error';
  const small = passwdEl.parentNode.getElementsByTagName('small')[0];
  small.textContent = passwdValid ? '' : PASSWORD_INVALID;
  checkFullForm();
}

function validateTelephone() {
  tlfValid = regTel.test(tlfEl.value.trim());
  tlfEl.className = tlfValid ? 'success' : 'error';
  const small = tlfEl.parentNode.getElementsByTagName('small')[0];
  small.textContent = tlfValid ? '' : TELEPHONE_INVALID;
  checkFullForm();
}

function validatePostalCode() {
  pCodeValid = regPCode.test(pCodeEl.value.trim());
  pCodeEl.className = pCodeValid ? 'success' : 'error';
  const small = pCodeEl.parentNode.getElementsByTagName('small')[0];
  small.textContent = pCodeValid ? '' : POSTALCODE_INVALID;
  checkFullForm();
}

formEl.addEventListener('submit', e => {
  e.preventDefault();
  if (!formEl.checkValidity()) {
    formEl.reportValidity();
    return;
  }
  console.log('Formulario válido');
});
