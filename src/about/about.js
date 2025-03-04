import './about.css';
// import teamContainer from '../components/team-pictures-section/team-pictures.js';
import timelineContainer from './timeline-section/timeline-section.js';
import aboutContent from '../content.json'
import componentsLoader from '../components/components-loader.js';

let aboutSubpage = (() => {
    const container = document.createElement("div");
    container.classList.add("about-container");
        

    // logoTextContainer start
    const logoTextContainer = document.createElement("div");
    logoTextContainer.classList.add("logo-text-container");

    const logo = document.createElement("img");
    setTimeout(() => {
        logo.src = require('../img/isolde-logo.svg');
        logo.alt = "ISOLDE logo";
    }, 0);

    const logoTextRightSubContainer = document.createElement("div");
    logoTextRightSubContainer.classList.add("logo-text-subcontainer")

    const studyTitle = document.createElement('h3');
    studyTitle.textContent = "International Study on Lucid Dreaming Expertise";

    const studySubTitle = document.createElement('p');
    studySubTitle.textContent = "The first large-scale study of lucid dreaming";

    logoTextRightSubContainer.appendChild(studyTitle);
    logoTextRightSubContainer.appendChild(studySubTitle);

    logoTextContainer.appendChild(logo);
    logoTextContainer.appendChild(logoTextRightSubContainer);

    container.appendChild(logoTextContainer);

    componentsLoader(aboutContent.about, container);

    const teamSectionTitle = document.createElement('h4');
    teamSectionTitle.textContent = "Team";
    container.appendChild(teamSectionTitle);

    // container.appendChild(teamContainer);

    // teamSection end

    // Timeline Section
    const timelineSectionTitle = document.createElement('h4');
    timelineSectionTitle.textContent = "Timeline";
    container.appendChild(timelineSectionTitle);

    container.appendChild(timelineContainer);

    return container;
})();


export default aboutSubpage;