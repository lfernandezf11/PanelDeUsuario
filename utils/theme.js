import { oneYear } from "./constants";

export function applyTheme(isDark) {
  const chooseTheme = document.getElementById('toggleThemeBtn');
  document.body.classList.toggle('dark', isDark); //Con segundo parámetro, toggle no alterna la clase, si no que si ese parámetro es true, añade la clase, y si es false la elimina.
  chooseTheme.innerText = isDark ? 'Modo Claro' : 'Modo Oscuro';
}

export function saveThemeCookie(isDark) {
  setCookieWithExpireDate('theme', isDark ? 'dark' : 'light', oneYear);
}