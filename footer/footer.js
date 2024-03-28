function loadFooter() {
    const footerContainer = $('#footer-container');

    const footerContent = /*html*/ `
        <footer class="row">
            <div class="copyright column gap-20">
                <a href="https://www.vamida.at/"><img src="../assets/icons/vamidalogo.png"></a>
                <span>© 2024 Vamida - Versandapotheke</span>
            </div>

            <div class="links-container column gap-15">
                <div>
                    <a target="_blank" href="https://www.vamida.at/agb">AGB</a>
                </div>
                <div>
                    <a target="_blank" href="https://www.vamida.at/impressum">Impressum</a>
                </div>
                <div>
                    <a target="_blank" href="https://www.vamida.at/datenschutzerklarung">Datenschutz</a>
                </div>
                <div>
                    <a onclick="openIconLinks()">ICONS</a>
                </div>
            </div>
        </footer> 
    `;

    includeTemplate(footerContainer, footerContent);
}

function renderLinks() {
    const linksContainer = $('.links-popup');
    linksContainer.innerHTML = '';

    const linksContent = /*html*/ `
        <img class="selected-event-card-close flex-center" onclick="closeIconLinks()" src="../assets/icons/close.svg" alt="X">

        <div class="links-popup-container column gap-20">
            <a href="https://www.flaticon.com/free-icons/up-arrow" title="up arrow icons">"Up arrow icon" created by 'Freepik' - Flaticon</a>
            <a href="https://www.flaticon.com/free-icons/arrow" title="arrow icons">"Down arrow icon" created by 'Freepik' - Flaticon</a>
            <a href="https://www.flaticon.com/free-icons/sun" title="sun icons">"Sun icon" created by 'Good Ware' - Flaticon</a>
            <a href="https://www.flaticon.com/free-icons/moon" title="moon icons">"Moon icon" created by 'Good Ware' - Flaticon</a>
            <!-- <a href="https://www.flaticon.com/free-icons/calendar" title="calendar icons">"Calendar icon" created by 'Freepik' - Flaticon</a> -->
        </div>
    `;

    includeTemplate(linksContainer, linksContent);
}

function openIconLinks() {
    $('.links-popup').classList.remove('d-none');
    $('#footer-container').classList.add('d-none'); //prevents buggy scroll - to be solved !

    renderLinks();
}

function closeIconLinks() {
    $('.links-popup').classList.add('d-none');
    $('#footer-container').classList.remove('d-none');
}