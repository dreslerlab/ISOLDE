import './map-modal.css'

const mapModalContainer = (() => {
    const mapModalContainer = document.createElement("div");
    mapModalContainer.classList.add("map-modal-container");
    mapModalContainer.style.visibility = "hidden";
    
    const mapModal = document.createElement("div");
    mapModal.classList.add("map-modal");
    mapModalContainer.appendChild(mapModal);

    const facilityTitle = document.createElement("h4");
    mapModal.appendChild(facilityTitle);

    const facilityDescription = document.createElement("p");
    mapModal.appendChild(facilityDescription);

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.textContent = "X";
    closeButton.classList.add("modal-button");
    closeButton.onclick = () => mapModalContainer.style.visibility = "hidden";
    mapModalContainer.onclick = (e) => {if(e.target==mapModalContainer)mapModalContainer.style.visibility = "hidden"};
    mapModal.appendChild(closeButton);


    const setFacilityTitle = (title) =>  facilityTitle.textContent = title;
    const setFacilityDescription = (desc) =>  facilityDescription.textContent = desc;
    return {container: mapModalContainer, setFacilityTitle, setFacilityDescription};
})();

export default mapModalContainer;