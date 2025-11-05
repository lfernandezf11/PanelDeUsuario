export function showView(id) {
  document.querySelectorAll('.view').forEach(view => {
    view.classList.remove('active');
    // Deshabilitar required en vistas ocultas
    view.querySelectorAll('[required]').forEach(el => el.setAttribute('disabled',''));
  });
  
  // Proceso inverso para la vista actual, la hacemos activas y habilitamos sus campos required. 
  const currentView = document.getElementById(id);
  currentView.classList.add('active');
  currentView.querySelectorAll('[disabled]').forEach(el => el.removeAttribute('disabled'));
  
}

/* --- Deja un formulario como recién cargado --- */
export function resetForm(formEl) {
  formEl.reset(); 
  // A diferencia de querySelector, querySelectorAll(...) devuelve un NodeList (puede estar vacío, pero no contiene null), con lo que
  // si el NodeList está vacío forEach no itera y ya está. No hace falta hacer comprobación tipo if(el)
  formEl.querySelectorAll('.error, .success').forEach(el => el.classList.remove('error','success'));
  formEl.querySelectorAll('small').forEach(el => el.textContent = '');
  formEl.querySelectorAll('.message').forEach(el => el.textContent = '');
  formEl.querySelectorAll('button.notAvailable').forEach(b => b.classList.add('notAvailable'));

  formEl.querySelectorAll('.password-field').forEach(field => {
    const input = field.querySelector('input[type="password"], input[type="text"]');
    if (input) input.type = 'password'; //Aquí sí comprobamos que exista el elemento (querySelector puede devolver null)

    const icon = field.querySelector('.toggle-pass i');
    if (icon) icon.className = 'fa fa-eye';
  });
}

export function showError(element, text) {
  const small = element.parentNode.getElementsByTagName('small')[0];
  small.textContent = text;
}

export function togglePassword(inputEl, iconEl) {
  const show = inputEl.type === 'password';      
  inputEl.type = show ? 'text' : 'password';      // alterna el tipo
  iconEl.className = show ? 'fa fa-eye-slash': 'fa fa-eye';
}