import textSection from './text-section.js'
import mapSection from './map-section/map.js';
import teamPhotos from './team-pictures-section/team-pictures.js';
import timelineSection from './timeline-section/timeline-section.js';

const createFromComponent = (component) => {
    switch (component.type) {
        case "text":
            return textSection(component);
        case "map":
            return mapSection(component.mapPoints);
        case "teamPhotos":
            return teamPhotos(component.people);
        case "timeline":
            return timelineSection(component);
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