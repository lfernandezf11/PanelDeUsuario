export function showView(id) {
  document.querySelectorAll('.view').forEach(
    element => element.classList.remove('active')
  );
  document.getElementById(id).classList.add('active');
}