document.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.getElementById('logout');

  logoutButton.addEventListener('click', () => {
    window.location.href = 'login.html';
  });

  const menu = document.getElementById('botonmenu');
  const nav = document.getElementById('sidebar');

  menu.addEventListener('click', () => {nav.classList.toggle('open'); });

  const tableBody = document.getElementById('specialties-table-body');
  const message = document.getElementById('specialties-message');
  let specialties = [];

  async function loadSpecialties() {
    try {
      const response = await fetch('./specialties.json');

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('El archivo de especialidades no contiene un array.');
      }

      specialties = data;
      const fragment = document.createDocumentFragment();

      specialties.forEach((specialty) => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const descriptionCell = document.createElement('td');

        nameCell.textContent = specialty.name;
        descriptionCell.textContent = specialty.description;
        row.append(nameCell, descriptionCell);
        fragment.append(row);
      });

      tableBody.replaceChildren(fragment);
      message.hidden = true;
    } catch (error) {
      console.error('No se pudieron cargar las especialidades:', error);
      message.textContent = 'No se pudieron cargar las especialidades.';
      message.hidden = false;
    }
  }

  loadSpecialties();
});


