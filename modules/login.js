import { showView, resetForm, togglePassword } from '../utils/dom.js';
import { regUser, regPasswd, oneDay } from './../utils/constants.js';
import { hashText } from './../utils/crypto.js';
import { setCookieWithExpireDate } from '../utils/cookies.js';
import { hydratePanel } from './panel.js';

const formEl = document.getElementById('login-view');
const userNameEl = document.getElementById('logUser');
const passwdEl = document.getElementById('logPass');
const submitBtnEl = document.getElementById('logSubmitBtn');
const message = document.getElementById('messageLog');

const goToRegister = document.getElementById('goToRegisterBtn');

const togglePassEl = document.querySelector('#login-view .password-fieldLog .toggle-passLog'); //Especificamos la vista para que no atrape el botón del registro.
const iconEl = togglePassEl.querySelector('i');



// Estado inicial
userNameEl.classList.remove('error','success');
passwdEl.classList.remove('error','success');
userNameEl.value = '';
passwdEl.value   = '';

let nameValid = false;
let passwdValid = false;

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

goToRegister.addEventListener('click', (e) => {
  e.preventDefault();
  showView('register-view');
  resetForm(formEl);
});


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
formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!formEl.checkValidity()) {
    formEl.reportValidity();
    return;
  }

  const username = userNameEl.value.trim();
  const password = passwdEl.value;

  const users = JSON.parse(localStorage.getItem("users") || "{}");
  const user = users[username];
  const hash = await hashText(password + user.salt);

  if (hash === user.hash) {
    setCookieWithExpireDate('username', username, oneDay);
    
    hydratePanel(); // Rellena <span id="username"> después de crear la cookie.
                    // Panel.js ya se cargó al arrancar la aplicación, cuando se importa a main.js. Eso quiere decir que el username (que ya existía en el dom
                    // aunque estuviese oculto) se encuentra vacío de base, y hay que rellenarlo antes de que se monte la vista. 
    showView('panel-view');
    resetForm(formEl);

  } else {
    userNameEl.classList.add('error');
    passwdEl.classList.add('error');
    message.textContent = "❌ Usuario o contraseña incorrectos";
  }
});

