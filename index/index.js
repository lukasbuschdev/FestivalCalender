// MAIN CONTENT SECTION

async function loadContent() {
    loadFilters();
    loadFilteredEventCards();
}

function loadFilters() {
    const filterContainer = $('#filter-container');
    filterContainer.innerHTML = /*html*/ `
        <div class="btn-containter row">
            <div class="filter-btn-container row gap-15">
                <button onclick="openFilters()">Filter</button>
                <button id="reset-filter-btn" class="d-none" onclick="resetSelectedFilter()">Filter löschen</button>
            </div>
            <img class="dark-mode-btn row gap-5" onclick="checkDarkMode()" src="../assets/icons/moon.png">
        </div>
    `;
}

async function loadFilteredEventCards(festivals) {
    festivals = festivals || await getData();

    let allEventCardsHTML = '';
    let counter = 0;

    festivals.forEach(festival => {
        allEventCardsHTML += renderEvents(festival);
        counter++;
        allEventCardsHTML = checkAd(allEventCardsHTML, counter);
    });

    const eventCardsContainer = $('#event-cards-container');
    eventCardsContainer.innerHTML = allEventCardsHTML;

    applyDarkModeToEventCards();
}

function checkAd(allEventCardsHTML, counter) {
    if(counter % 6 === 0) {
        const adIndex = Math.floor((counter / 6 - 1) % ads.length);
        const ad = ads[adIndex];
        return allEventCardsHTML + renderAdBlock(ad);
    }
    return allEventCardsHTML;
}

function renderEvents({ LAND, id, NAME, DATUM, KATEGORIE }) {
    return /*html*/ `
        <div class="event-card column" onclick="openSelectedFestival(${id})">
            <div class="column card-info">
                <div class="card-image">
                    <img src="${renderCardImages()}">
                </div>
                <div class="column gap-10">
                    <span class="event-name">${highlightIfContains(NAME, currentInput)}</span>
                    <div class="row event-country-container">
                        <img src="${renderFlags(LAND)}">
                        <span class="event-country">${highlightIfContains(LAND, currentInput)}</span>
                    </div>
                    <div class="row">
                        <span class="event-genre">${highlightIfContains(KATEGORIE, currentInput)}</span>
                        <span class="event-date">${processDate(DATUM)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function processDate(DATUM) {
    if(DATUM.includes('-')) {
        const [start, end] = DATUM.split('-').map(s => s.trim());
        return `${highlightIfContains(start, currentInput)} - ${highlightIfContains(end, currentInput)}`;
    }
    return highlightIfContains(DATUM, currentInput);
}

function renderCardImages() {
    const imagePath = cardImages[imageIndex];
    imageIndex = (imageIndex + 1) % cardImages.length;
    return imagePath;
}

function renderFlags(LAND) {
    return countryFlags[LAND] || '';
}

function renderAdBlock(ad) {
    return /*html*/ `
        <div class="ad-container">
            <a href="${ad.src}">
                <img src="${ad.img}">
            </a>
        </div>
    `;
}



// SELECTED FESTIVAL/EVENT SECTION

async function openSelectedFestival(id) {
    const selectedFestival = await checkFestivalId(id);
    renderSelectedFestival(selectedFestival);

    document.body.style.overflow = 'hidden';
}

async function checkFestivalId(id) {
    const festivalId = parseInt(id);
    const festivals = await getData();
    const festivalExists = festivals.find(festival => festival.id === festivalId);    
    
    if(festivalExists) return festivalExists; 
}

function renderSelectedFestival(selectedFestival) {
    const selectedFestivalContainer = $('#selected-festival-container-upper');
    $('#selected-festival-container-upper').classList.remove('d-none');

    selectedFestivalContainer.innerHTML = selectedFestivalTemplate(selectedFestival);
    selectedCardDarkMode();
}

function selectedFestivalTemplate({ LAND, BUNDESLAND, NAME, DATUM, STADT, GENRES, DAUER, KATEGORIE, WO, BESUCHER, URL }) {
    return /*html*/ `
        <div class="selected-festival-container-lower flex-center" onclick="closeSelectedFestival()">
            <div class="selected-event-card column" onclick="event.stopPropagation()">
                <img class="close grid-center" src="../assets/icons/close.svg" alt="X" onclick="closeSelectedFestival()">
                <span class="selected-event-name">${NAME}</span>

                <div class="row selected-card-info gap-30">${renderSelectedCardInfo(LAND, BUNDESLAND, DATUM, STADT, GENRES, DAUER, KATEGORIE, WO, BESUCHER)}</div>

                <div class="selected-event-tickets-container">
                    <a class="selected-event-tickets flex-center" target="_blank" href="${URL}">Tickets</a>
                </div>
            </div>
        </div>
    `;
}

function renderSelectedCardInfo(LAND, BUNDESLAND, DATUM, STADT, GENRES, DAUER, KATEGORIE, WO, BESUCHER) {
    return /*html*/ `
        <div class="selected-card-container column">
            <div class="selected-event-date-container grid-center">
                <div class="flex-center">
                    <span class="selected-event-date">${processDate(DATUM)}</span>
                </div>
            </div>

            <div class="selected-event-info-container row">${renderSelectedEventInfo(LAND, BUNDESLAND, STADT, GENRES, DAUER, KATEGORIE, WO, BESUCHER)}</div>
        </div>
        <div class="selected-card-image">
            <img src="${renderCardImages()}">
        </div>
    `;
}

function renderSelectedEventInfo(LAND, BUNDESLAND, STADT, GENRES, DAUER, KATEGORIE, WO, BESUCHER) {
    return /*html*/ `
        <div class="column gap-5">
            <div class="selected-event-info row">
                <span class="selected-event-country">Land: </span><span class="selected-event-country">${LAND}</span>
            </div>
            <div class="selected-event-info row">
                <span class="selected-event-state">Bundesland: </span><span class="selected-event-state">${BUNDESLAND}</span>
            </div>
            <div class="selected-event-info row">
                <span class="selected-event-location">Stadt: </span><span class="selected-event-location">${STADT}</span>
            </div>
            <div class="selected-event-info row">
                <span>Genre: </span><span class="selected-event-genre">${GENRES}</span>
            </div>
            <div class="selected-event-info row">
                <span class="selected-event-category">Kategorie: </span><span class="selected-event-category">${KATEGORIE}</span>
            </div>
            <div class="selected-event-info row">
                <span class="selected-event-where">Wo: </span><span class="selected-event-where">${WO}</span>
            </div>
            <div class="selected-event-info row">
                <span class="selected-event-duration">Dauer: </span><span class="selected-event-duration">${DAUER}</span>
            </div>
            <div class="selected-event-info row">
                <span class="selected-event-visitors">Besucher: </span><span class="selected-event-visitors">${BESUCHER}</span>
            </div>
        </div>
    `;
}

function closeSelectedFestival() {
    $('#selected-festival-container-upper').classList.add('d-none');
    $('#selected-festival-container-upper').innerHTML = '';

    document.body.style.overflow = 'auto';
}



// INTERSECTION OBSERVER FOR SCROLL UP BUTTON

function toggleScrollUpButton() {
    $('#scroll-up').classList.toggle('d-none');
}

const intObserver = new IntersectionObserver((entries) => {
    toggleScrollUpButton();
}, { threshold: 0, rootMargin: "250px" });


function intObserverSetup() {
    const el = $('header');
    intObserver.observe(el);
}