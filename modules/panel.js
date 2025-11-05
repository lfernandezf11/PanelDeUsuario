import { getCookie, setCookieWithExpireDate } from '../utils/cookies.js';
import { showView } from '../utils/dom.js';
import { applyTheme, saveThemeCookie } from '../utils/theme.js';

const logout = document.getElementById('logoutBtn');

// Estado inicial 
const savedTheme = getCookie('theme');      // 'dark' | 'light' | undefined
const isDark = savedTheme === 'dark';
applyTheme(isDark);

// Si no existía cookie, define la predeterminada
if (!savedTheme) saveThemeCookie(false);


logout.addEventListener('click', () => {
    document.cookie = 'username=; Max-Age=0; path=/PanelDeUsuario';
    showView('login-view');
});

chooseTheme.addEventListener('click', () => {
  const willBeDark = !document.body.classList.contains('dark');
  applyTheme(willBeDark);
  saveThemeCookie(willBeDark);
});


export function hydratePanel() {
  const username = document.getElementById('username');
  if (!username) return;
  const user = getCookie('username'); 
  username.textContent = user || '';
}
