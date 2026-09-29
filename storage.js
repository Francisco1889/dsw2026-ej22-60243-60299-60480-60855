const STORAGE_KEY = 'specialties';
function initStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
}

function getSpecialties() {
    initStorage();
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
}

function saveSpecialty(specialty) {
    const specialties = getSpecialties();
    specialty.id = crypto.randomUUID(); 
    specialties.push(specialty);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(specialties));
}