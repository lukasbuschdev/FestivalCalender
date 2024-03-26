// #######################################################################
// LOADING PAGE
// #######################################################################

async function init() {
    loadHeader();
    loadContent();
    loadFooter();
}



// #######################################################################
// GET DATASET
// #######################################################################

const dataset = [
    "../database.json"
];



// #######################################################################
// GET DATASET AND CONVERT .CSV TO .JSON
// #######################################################################

async function getData() {
    const data = await (await fetch(dataset)).json();
    return data;
}