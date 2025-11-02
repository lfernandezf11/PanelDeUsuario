export function showView(id) {
  document.querySelectorAll('.view').forEach(
    element => element.classList.remove('active')
  );
  document.getElementById(id).classList.add('active');
}

export function showMessage(text) {
  document.getElementById("message").textContent = text;
}

export function showError(element, text) {
  const small = element.parentNode.getElementsByTagName('small')[0];
  small.textContent = text;
}