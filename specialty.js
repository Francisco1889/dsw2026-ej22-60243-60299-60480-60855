document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');

  logoutButton.addEventListener('click', () => {
    window.location.href = 'login.html';
  });

  const menu = document.getElementById('botonmenu');
  const nav = document.getElementById('sidebar');

  menu.addEventListener('click', () => {nav.classList.toggle('open'); });


  
  const form = document.getElementById('specialty-form');
  const nameInput = document.getElementById('name');
  const descriptionInput = document.getElementById('description');
  const nameError = document.getElementById('name-error');
  const descriptionError = document.getElementById('description-error');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();
    let isValid = true;

    nameError.textContent = '';
    descriptionError.textContent = '';

    if (name === '') {
      nameError.textContent = 'El nombre es obligatorio.';
      isValid = false;
    } else if (name.length > 15) {
      nameError.textContent = 'El nombre no puede superar los 15 caracteres.';
      isValid = false;
    }

    if (description === '') {
      descriptionError.textContent = 'La descripción es obligatoria.';
      isValid = false;
    } else if (description.length > 100) {
      descriptionError.textContent = 'La descripción no puede superar los 100 caracteres.';
      isValid = false;
    }

    if (isValid) {
      const specialty = { name, description };
      console.log(specialty);
      form.reset();
    }
  });
});