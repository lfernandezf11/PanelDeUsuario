import { getCookie } from '../utils/cookies.js';
import { showView } from '../utils/dom.js';

const username = document.getElementById('username');
const chooseTheme = document.getElementById('toggleThemeBtn');
const logout = document.getElementById('logoutBtn');

username.textContent = getCookie('username');

logout.addEventListener('click', () => {
    document.cookie = 'username=; Max-Age=0; path=/';
    showView('login-view');
});

chooseTheme.addEventListener('click', (e) => {
    document.cookie = 'theme='
})

