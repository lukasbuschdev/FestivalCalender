function loadHeader() {
    const headerContainer = $('#header-container');

    const headerContent = /*html*/ `
        <header class="bg-white flex-center">
            <div id="header-img">
                <h1>Festivalkalender</h1>
                <div id="search-bar" class="row">
                    <img src="/assets/icons/loupe.svg">
                    <input type="text">
                </div>
            </div>
        </header>
    `;

    includeTemplate(headerContainer, headerContent);
};