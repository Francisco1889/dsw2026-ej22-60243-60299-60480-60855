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
  const searchForm = document.getElementById('specialties-search-form');
  const searchInput = document.getElementById('specialties-search');
  const searchButton = searchForm.querySelector('button');
  let allSpecialties = [];
  let currentFilteredSpecialties = [];
  let currentPage = 1;
  const pageSize = 5;

    function renderSpecialties() {
        tableBody.innerHTML = '';
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedItems = currentFilteredSpecialties.slice(startIndex, endIndex);

        const fragment = document.createDocumentFragment();
        paginatedItems.forEach((specialty) => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const descriptionCell = document.createElement('td');
            nameCell.textContent = specialty.name;
            descriptionCell.textContent = specialty.description;
            row.append(nameCell, descriptionCell);
            fragment.append(row);
        });
        tableBody.replaceChildren(fragment);

        message.textContent = currentFilteredSpecialties.length === 0 ? 'No se encontraron especialidades.' : '';
        message.hidden = currentFilteredSpecialties.length > 0;

        const totalPages = Math.ceil(currentFilteredSpecialties.length / pageSize) || 1;
        document.getElementById('pageInfo').textContent = `Página ${currentPage} de ${totalPages}`;
    }

  function normalizeText(value) {
    return value.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchTerm = normalizeText(searchInput.value.trim());
        currentFilteredSpecialties = allSpecialties.filter((specialty) =>
            normalizeText(specialty.name).includes(searchTerm)
        );
        currentPage = 1;
        renderSpecialties();
    });

    document.getElementById('btnPrev').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderSpecialties();
        }
    });

    document.getElementById('btnNext').addEventListener('click', () => {
        const totalPages = Math.ceil(currentFilteredSpecialties.length / pageSize);
        if (currentPage < totalPages) {
            currentPage++;
            renderSpecialties();
        }
    });

    function loadSpecialties() {
        allSpecialties = getSpecialties();
        currentFilteredSpecialties = [...allSpecialties];
        renderSpecialties();
        searchButton.disabled = false;
    }

    loadSpecialties();
});


