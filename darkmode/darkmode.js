// DARK MODE SECTION

function checkDarkMode() {
    if(!darkModeActive) return activateDarkMode();
    if(darkModeActive) return deactivateDarkMode();
}

function activateDarkMode() {
    darkModeActive = true;
    const allEventCards = $$('.event-card');
    const allFilters = $$('.filters button');

    $('.dark-mode-btn').setAttribute('src', '../assets/icons/sun.png');

    $('body').classList.add('dark-mode-body');
    $('#header-img').classList.add('dark-mode-header');

    allEventCards.forEach(eventCard => eventCard.classList.add('dark-mode-card'));
    allFilters.forEach(filter => filter.classList.add('dark-mode-filter'));

    saveDarkModeSetting();
}

function deactivateDarkMode() {
    darkModeActive = false;
    const allEventCards = $$('.event-card');
    const allFilters = $$('.filters button');

    $('.dark-mode-btn').setAttribute('src', '../assets/icons/moon.png');

    $('body').classList.remove('dark-mode-body');
    $('#header-img').classList.remove('dark-mode-header');

    allEventCards.forEach(eventCard => eventCard.classList.remove('dark-mode-card'));
    allFilters.forEach(filter => filter.classList.remove('dark-mode-filter'));

    saveDarkModeSetting();
}

function selectedCardDarkMode() {
    if(darkModeActive) return $('.selected-event-card').classList.add('dark-mode-selected-card');
    if(!darkModeActive) return $('.selected-event-card').classList.remove('dark-mode-selected-card'); 
}

function filterListDarkMode() {
    const allItems = $$('.list-item-container span');

    if(darkModeActive) {
        $('#filter-list-card').classList.add('dark-mode-filter-list-card');
        allItems.forEach(item => item.classList.add('dark-mode-filter-list-item')); 
    } 

    if(!darkModeActive) {
        $('#filter-list-card').classList.remove('dark-mode-filter-list-card');
        allItems.forEach(item => item.classList.remove('dark-mode-filter-list-item'));
    } 
}

function applyDarkModeToEventCards() {
    if(darkModeActive) {
        const allEventCards = $$('.event-card');
        allEventCards.forEach(eventCard => eventCard.classList.add('dark-mode-card'));
    }
}



// SAVE DARK MODE TO LOCAL STORAGE / EXPERIMENTAL

function saveDarkModeSetting() {
    localStorage.setItem('darkMode', darkModeActive.toString());
}

function loadDarkModeSetting() {
    const storedValue = localStorage.getItem('darkMode');
    darkModeActive = storedValue === 'true';

    darkModeActive ? activateDarkMode() : deactivateDarkMode();
}