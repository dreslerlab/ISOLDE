import textSection from './text-section.js'
import mapSection from './map-section/map.js';
import teamPhotos from './team-pictures-section/team-pictures.js';

const createFromComponent = (component) => {
    switch (component.type) {
        case "text":
            return textSection(component);
        case "map":
            return mapSection(component.mapPoints);
        case "teamPhotos":
            console.log("loader");
            console.log(component.people);
            return teamPhotos(component.people);
    };
};

const componentsLoader = (componentsJSON, container) => {
    componentsJSON.forEach(component => {
        const tmp = createFromComponent(component);
        console.log(tmp);
        container.appendChild(tmp);
    });
};

export default componentsLoader;