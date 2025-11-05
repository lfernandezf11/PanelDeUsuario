import { getCookie } from '../utils/cookies.js';
import { showView } from '../utils/dom.js';

const username = document.getElementById('username');
const chooseTheme = document.getElementById('toggleThemeBtn');
const logout = document.getElementById('logoutBtn');

username.textContent = getCookie();

logout.addEventListener('click', () => {
    document.cookie = 'username=; Max-Age=0; path=/PanelDeUsuario';
    showView('login-view');
});

// chooseTheme.addEventListener('click', (e) => {
//     document.cookie = 'theme='
// })
// Meter el ojo de la contraseña
