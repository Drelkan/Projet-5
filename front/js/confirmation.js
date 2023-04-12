// let url = (new URL(location)).searchParams;
// let id = url.get("id");

// document.getElementById("orderId").innerHTML = `${id}`;

// localStorage.clear();


//**Récupération de l'ID depuis l'URL */
function getIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

//**Contenu d'un élément par son ID */ */
function setElementContentById(id, content) {
    const element = document.getElementById(id);
    if (element) {
        element.innerHTML = content;
    } else {
        console.error(`Element with ID '${id}' not found.`);
    }
}

//**Contenu du localStorage vidé */
function clearLocalStorage() {
    localStorage.clear();
}

const id = getIdFromUrl();
setElementContentById("orderId", id);
clearLocalStorage();





