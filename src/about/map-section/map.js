import './map.css';

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
        {x: 48.51, y: 43.84, text: "I'm point on the map!"},
        {x: 52.97, y: 44.89, text: "I'm point on the map!"},
        {x: 80.49, y: 80.18, text: "I'm point on the map!"}
    ];

    mapPoints.forEach((point) => {
        const pointDiv = document.createElement("div");
        pointDiv.classList.add("map-point");
        pointDiv.style.top = `${point.y}%`;
        pointDiv.style.left = `${point.x}%`;
        zoomDiv.appendChild(pointDiv);
    });

    let scale = 1;
    let startDistance = 0;

    // Handle touchpad pinch & mouse scroll zoom
    zoomDiv.addEventListener("wheel", function (event) {
        if (event.ctrlKey || event.deltaY !== 0) { 
            event.preventDefault();
            scale += event.deltaY * -0.01;
            scale = Math.min(Math.max(1, scale), 3);
            zoomDiv.classList.add("zoom-div");
            zoomDiv.style.transform = `scale(${scale})`;
        }
    });

    // Handle mobile pinch-to-zoom
    zoomDiv.addEventListener("touchstart", (e) => {
        if (e.touches.length === 2) { 
            startDistance = getDistance(e.touches[0], e.touches[1]);
        }
    });

    zoomDiv.addEventListener("touchmove", (e) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            let newDistance = getDistance(e.touches[0], e.touches[1]);
            let zoomFactor = newDistance / startDistance;
            scale = Math.min(Math.max(1, scale * zoomFactor), 3);
            zoomDiv.style.transform = `scale(${scale})`;
        }
    });

    // Function to get touch distance
    function getDistance(touch1, touch2) {
        return Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
    };

    return mapContainer;
})();

export default mapSection;