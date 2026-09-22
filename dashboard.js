document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');

  logoutButton.addEventListener('click', () => {
    window.location.href = 'login.html';
  });

  const menu = document.getElementById('botonmenu');
  const nav = document.getElementById('sidebar');

  menu.addEventListener('click', () => {nav.classList.toggle('open'); });
});


