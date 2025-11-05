import { getCookie, setCookieWithExpireDate } from '../utils/cookies.js';
import { showView } from '../utils/dom.js';
import { oneYear } from '../utils/constants.js';

const chooseTheme = document.getElementById('toggleThemeBtn');
const logout = document.getElementById('logoutBtn');
const input = document.querySelectorAll('input');


chooseTheme.innerText = "Modo Oscuro";
setCookieWithExpireDate('theme', 'light', oneYear);

export function hydratePanel() {
  const username = document.getElementById('username');
  if (!username) return;
  const user = getCookie('username'); 
  username.textContent = user || '';
}

logout.addEventListener('click', () => {
    document.cookie = 'username=; Max-Age=0; path=/PanelDeUsuario';
    showView('login-view');
});

chooseTheme.addEventListener('click', (e) => {
    const light = chooseTheme.innerText === "Modo Oscuro";
    chooseTheme.innerText = light ? "Modo Claro" : "Modo Oscuro";
    document.body.classList.toggle('dark');
    input.classList.toggle('dark');
    if(getCookie('theme') === 'light' && light) setCookieWithExpireDate('theme', 'dark', oneYear);
});

