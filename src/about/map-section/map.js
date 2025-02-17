import './map.css';
import mapModalContainer from './map-modal';

const mapSection = (() => {
    const mapContainer = document.createElement("div");
    mapContainer.classList.add("map-container");

    const zoomDiv = document.createElement("div");
    zoomDiv.classList.add("zoomable");
    mapContainer.appendChild(zoomDiv);

    const map = document.createElement("img");
    setTimeout(() => {
        map.src = require('../../img/map.svg');
        map.alt = "Map image";
    }, 0);
    map.classList.add("map-img");
    zoomDiv.appendChild(map);

    let mapPoints = [
        {x: 48.51, y: 43.84, name: "Cool Facility", description: "I'm cool facility"},
        {x: 52.97, y: 44.89, name: "Extra Facility", description: "I'm extra facility"},
        {x: 80.49, y: 80.18, name: "Giga Facility", description: "I'm giga facility"}
    ];
   
    mapPoints.forEach((point) => {
        const pointDiv = document.createElement("div");
        pointDiv.classList.add("map-point");
        pointDiv.style.top = `${point.y}%`;
        pointDiv.style.left = `${point.x}%`;
        pointDiv.onclick = () => {
            mapModalContainer.setFacilityTitle(point.name);
            mapModalContainer.setFacilityDescription(point.description);
            mapModalContainer.container.style.visibility = "visible";
        };
        zoomDiv.appendChild(pointDiv);
    });


    // let scale = 1;
    // let startDistance = 0;
    // zoomDiv.classList.add("zoom-div");
    // Handle touchpad pinch & mouse scroll zoom
    // zoomDiv.style.setProperty('--translate-x', `0%`);
    // zoomDiv.style.setProperty('--scale', `1`);
    // mapContainer.addEventListener("wheel", function (e) {
    //     if (e.ctrlKey || e.deltaY !== 0) { 
    //         e.preventDefault();
    //         scale += e.deltaY * -0.01;
    //         scale = Math.min(Math.max(1, scale), 3);
    //         zoomDiv.style.setProperty('--scale', `${scale}`);
    //         if(scale > 1 && scale < 3 && e.deltaY>0)zoomDiv.style.setProperty('--translate-x', `${Math.min(50, Math.max(-50, parseInt(zoomDiv.style.getPropertyValue('--translate-x')) - 10*(e.clientX - mapContainer.offsetLeft - mapContainer.clientWidth / 2) / (scale*mapContainer.clientWidth)))}%`);
    //         if(scale >= 1 && scale < 3 && e.delyaY<=0)zoomDiv.style.setProperty('--translate-x', `${100*(1-scale)/2}%`);
    //         // zoomDiv.style.transform = `translateX(-${2* (e.clientX - mapContainer.offsetLeft - mapContainer.clientWidth / 2) / mapContainer.clientWidth}%)`;
    //         // zoomDiv.style.transform = `scale(${scale}) translateX(${10*(e.clientX - mapContainer.offsetLeft - mapContainer.clientWidth / 2) / (mapContainer.clientWidth)}%)`;
    //         // console.log(parseInt(zoomDiv.style.getPropertyValue('--translate-x')) + 10*(e.clientX - mapContainer.offsetLeft - mapContainer.clientWidth / 2) / (mapContainer.clientWidth));
    //         // console.log(((e.clientX - mapContainer.offsetLeft - mapContainer.clientWidth / 2) / mapContainer.clientWidth) * mapContainer.scrollWidth, mapContainer.scrollWidth)
    //         console.log(100*(1-scale)/2);
    //     }
    // });

    // Handle mobile pinch-to-zoom
    // zoomDiv.addEventListener("touchstart", (e) => {
    //     if (e.touches.length === 2) { 
    //         startDistance = getDistance(e.touches[0], e.touches[1]);
    //     }
    // });

    // zoomDiv.addEventListener("touchmove", (e) => {
    //     if (e.touches.length === 2) {
    //         e.preventDefault();
    //         let newDistance = getDistance(e.touches[0], e.touches[1]);
    //         let zoomFactor = newDistance / startDistance;
    //         scale = Math.min(Math.max(1, scale * zoomFactor), 3);
    //         zoomDiv.style.transform = `scale(${scale})`;
    //     }
    // });

    // // Function to get touch distance
    // function getDistance(touch1, touch2) {
    //     return Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
    // };

   
    mapContainer.appendChild(mapModalContainer.container);
    // mapModalContainer.setFacilityTitle("Facility");
    // mapModalContainer.setFacilityDescription("Facility description");
    

    return mapContainer;
})();

export default mapSection;