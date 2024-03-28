// FILTER POPUP SECTION

let isOpened = false;

function openFilters() {
    isOpened = true;

    const popupContainer = $('#filter-popup-container');
    popupContainer.classList.remove('d-none');

    document.body.style.overflow = 'hidden';

    renderFilterContent(popupContainer);
}



// MAIN FILTER POPUP TEMPLATE SECTION

function renderFilterContent(popupContainer) {
    popupContainer.innerHTML = /*html*/ `
        <div class="popup-content" onclick="event.stopPropagation()">
            <img class="close" src="../assets/icons/close.svg" alt="X" onclick="closeFilters()">

            ${renderNameFilter()}
            ${renderCountryFilter()}
            ${renderCategoryFilter()}
            ${renderDateFilter()}
            ${renderPriceFilter()}
            ${renderSearchDeleteBtns()}
        </div>
    `;
}



// FILTER CONTENT TEMPLATES SECTION

function renderNameFilter() {
    return /*html*/ `
        <div class="single-filter column gap-10">
            <span>Name</span>
            <div class="drp-wrapper">
                <div class="drp-input">Wähle einen Namen...</div>
                <div class="drp-options-container"></div>
            </div>
        </div>
    `;
}

function renderCountryFilter() {
    return /*html*/ `
        <div class="single-filter column gap-10">
            <span>Land</span>
            <div class="drp-wrapper">
                <div class="drp-input">Wähle ein Land...</div>
                <div class="drp-options-container"></div>
            </div>
        </div>
    `;
}

function renderCategoryFilter() {
    return /*html*/ `
        <div class="single-filter column gap-10">
            <span>Genre</span>
            <div class="drp-wrapper">
                <div class="drp-input">Wähle ein Genre...</div>
                <div class="drp-options-container"></div>
            </div>
        </div>
    `;
}

function renderDateFilter() {
    return /*html*/ `
        <div class="single-filter column gap-10">
            <span>Datum</span>
            <div class="drp-wrapper">
                <div class="drp-input">Wähle einen Monat...</div>
                <div class="drp-options-container"></div>
            </div>
        </div>
    `;
}

function renderPriceFilter() {
    return /*html*/ `
        <div class="single-filter column gap-10">
            <span>Preis</span>
            <div class="filter-price row gap-10">
                <input type="number">
                <input type="number">
            </div>
        </div>
    `;
}

function renderSearchDeleteBtns() {
    return /*html*/ `
        <div class="search-delete gap-20">
            <button>Suchen</button>
            <button>Löschen</button>
        </div>
    `;
}



// CLOSE FILTER

function closeFilters() {
    const popupContainer = $('#filter-popup-container');
    popupContainer.classList.add('d-none');

    document.body.style.overflow = 'auto';
}



// GET FILTER DATA SECTION

function sortByFirstLetter(array) {
    return array.sort((a, b) => a[0].localeCompare(b[0]));
}

async function getAllDates() {
    const date = (await getFestivals()).map(festival => festival.DATUM);
    const uniqueDate = new Set(date);

    return Array.from(uniqueDate);
}

function getDates() {
    $('#date').addEventListener('click', async function() {
        const dates = await getAllDates();
        const sortedList = sortDates(dates);
        openFilterList(sortedList);
    });
}

function sortDates(dates) {
    return dates.sort((a, b) => {
        let [monthA, dayA] = a.split('-');
        let [monthB, dayB] = b.split('-');

        monthA = monthMap[monthA];
        monthB = monthMap[monthB];

        return monthA === monthB ? parseInt(dayA, 10) - parseInt(dayB, 10) : monthA - monthB;
    });
}