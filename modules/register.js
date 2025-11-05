import { showView, showError, resetForm, togglePassword } from '../utils/dom.js';
import { regUser, regPasswd, regTel, regPCode } from '../utils/constants.js';
import { hashText, generateSalt } from './../utils/crypto.js';

const formEl = document.getElementById('register-view');
const userNameEl = document.getElementById('regUser');
const passwdEl = document.getElementById('regPass');
const tlfEl = document.getElementById('regTlf');
const pCodeEl = document.getElementById('regPCode');
const legalAgeEl = document.getElementById('regLegalAge');
const ageEl = document.getElementById('regAge');
const ageContainer = document.getElementById('regAge').parentElement; //Como el input age está contenido en el div inputInline, hacemos referencia a él para controlar el display de todo el bloque.
const submitBtnEl = document.getElementById('regSubmitBtn');
const message = document.getElementById('messageReg');

const togglePassEl = document.querySelector('#register-view .password-field .toggle-pass'); //Especificamos la vista para que no atrape el botón del login.
const iconEl = togglePassEl.querySelector('i');

const goToLogin = document.getElementById('goToLoginBtn');

// Estado inicial: checkbox no marcado, campo edad oculto y disabled. Icono de contraseña de ojo abierto.
legalAgeEl.checked = false;
ageContainer.style.display = 'none'; // Estado inicial del contenedor del campo.
ageEl.required = false;
ageEl.disabled = true;

let nameValid = false;
let passwdValid = false;
let tlfValid = false;
let pCodeValid = false;
let ageValid = false;

const USERNAME_INVALID = 'El nombre de usuario debe tener al menos 3 caracteres';
const PASSWORD_INVALID = 'La contraseña debe tener 8 caracteres, una mayúscula y una minúscula';
const TELEPHONE_INVALID = 'El número de teléfono debe tener 9 dígitos.';
const POSTALCODE_INVALID = 'El código postal debe tener 5 dígitos';
const AGE_INVALID = 'Es obligatorio que indique su edad (18-99) si marca la casilla';

userNameEl.addEventListener('blur', validateName);

// Para evitar que salte validatePassword() cuando pulsamos el botón del ojo: 
// 1. Evitamos que el botón capte el foco:
togglePassEl.addEventListener('pointerdown', (e) => e.preventDefault()); 
togglePassEl.addEventListener('click', () => { 
  togglePassword(passwdEl, iconEl);
  passwdEl.focus({ preventScroll: true }); //Devuelve el foco al input de la contraseña después del click (para seguir escirbiendo si volver a clicar el campo)
});

// 2. Aseguramos que sólo se ejecute validatePassword si el target del foco es el toggle. ESTO ES UN SEGURO, EN TEORÍA NO HACE FALTA.
/* Para evitar que ocurra la pérdida del foco al pulsar el ojo, cambiamos el evento del input de la contraseña de 'blur' (que solo se dispara en el propio 
 * elemento) a 'focusout', que "burbujea" desde el foco a sus elementos padre hasta llegar a document/window. 
 * ¿Qué quiere decir esto? Que cuando pulsamos el botón (focusable por defecto), no el icon, del ojo, éste captura el foco, es decir, es el Target  
 * (relatedTarget) del foco que se pierde en el input. 
 */
passwdEl.addEventListener('focusout', (e) => {
  if (e.relatedTarget && e.relatedTarget.closest('.toggle-pass')) return; 
  validatePassword();
});

tlfEl.addEventListener('blur', validateTelephone);
pCodeEl.addEventListener('blur', validatePostalCode);
ageEl.addEventListener('blur', validateAge);
// La primera validación de la edad se hace aquí, porque de lo contrario sólo se dispara cuando hay un evento sobre el checkbox.
// Es decir, si rellenamos todos los campos y no llegamos a hacer check, el botón de 'crear usuario' no se habilita.
validateAge();

goToLogin.addEventListener('click', (e) => {
  e.preventDefault();
  showView('login-view');
  resetForm(formEl);
});

// Muestra el campo de edad y lo hace obligatorio cuando el checkbox está marcado
legalAgeEl.addEventListener('change', () => {
  const show = legalAgeEl.checked; // Para controlar el estado del campo edad en menos líneas (no un if/else con classList.add/remove)
  ageContainer.style.display = show ? 'flex' : 'none';
  console.log(ageContainer.style.display);
  ageEl.required = show;
  ageEl.disabled = !show;
  validateAge();
});


/* Funciones de validación ---------------------------------------*/
function checkFullForm() {
  nameValid && passwdValid && tlfValid && pCodeValid && ageValid
    ? submitBtnEl.classList.remove('notAvailable')
    : submitBtnEl.classList.add('notAvailable');
}

function validateName() {
  nameValid = regUser.test(userNameEl.value.trim());
  userNameEl.className = nameValid ? 'success' : 'error';
  // Si no tuviéramos showError(), small debería declararse en cada función (no puede declararse como constante global porque cada campo tiene el suyo).
  showError(userNameEl, nameValid ? '' : USERNAME_INVALID);
  checkFullForm();
}

function validatePassword() {
  passwdValid = regPasswd.test(passwdEl.value);
  passwdEl.className = passwdValid ? 'success' : 'error';
  showError(passwdEl, passwdValid ? '' : PASSWORD_INVALID);
  checkFullForm();
}

function validateTelephone() {
  tlfValid = regTel.test(tlfEl.value.replaceAll(' ', '')); // Elimina los espacios del campo de entrada
  tlfEl.className = tlfValid ? 'success' : 'error';
  showError(tlfEl, tlfValid ? '' : TELEPHONE_INVALID);
  checkFullForm();
}

function validatePostalCode() {
  pCodeValid = regPCode.test(pCodeEl.value.replaceAll(' ', ''));
  pCodeEl.className = pCodeValid ? 'success' : 'error';
  showError(pCodeEl, pCodeValid ? '' : POSTALCODE_INVALID);
  checkFullForm();
}

function validateAge() {
  if (ageEl.disabled) { //Si el campo no aplica, se considera la edad válida.
    ageValid = true;
    // Limpiamos el campo antes del return para que no queden estilos asociados a clases o un error en pantalla.
    ageEl.classList.remove('error', 'success');
    showError(ageEl, '');
    checkFullForm();
    return;
  }

  // El valor del campo es un String, hay que recuperarlo como número (valueAsNumber devuelve Number o NaN, pero no vamos a ponernos estrictas aquí).
  const n = ageEl.valueAsNumber;
  const nValid = Number.isInteger(n) && n >= 18 && n <= 99;

  ageValid = legalAgeEl.checked && nValid;
  ageEl.className = ageValid ? 'success' : 'error';
  showError(ageEl, ageValid ? '' : AGE_INVALID);
  checkFullForm();

}


/* MANEJO DE REGISTRO -----------------------------*/
// Método contenido en crypto.js (lo personalizamos aquí)
// Asíncrona, utiliza recursos externos (crypto)
formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!formEl.checkValidity()) { // Validación estándar de formulario
    formEl.reportValidity();
    return;
  }

  const username = userNameEl.value.trim();
  const password = passwdEl.value;
  // Todos los usuarios se guardan en un diccionario 'users' para poder recorrer las claves rápidamente.
  const users = JSON.parse(localStorage.getItem('users') || '{}');

  if (users[username]) { // Manejo de usuarios no repetidos
    userNameEl.classList.add('error');
    showError(userNameEl, 'Ese usuario ya existe')
    return;
  }

  const salt = generateSalt();
  const hash = await hashText(password + salt);
  const phone = tlfEl.value.replace(' ', '');
  const postal = pCodeEl.value.replace(' ', '');
  const age = legalAgeEl.checked ? Number(ageEl.value) : null;

  users[username] = {
    salt,
    hash,
    profile: {
      phone,
      postalCode: postal,
      age, // null si no aplica
    },
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem('users', JSON.stringify(users));
  message.textContent = '✅ Usuario registrado correctamente';
  setTimeout(() => showView('login-view'), 1000);
  resetForm(formEl);
});

