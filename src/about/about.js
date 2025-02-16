import './about.css';
import mapSection from './map-section/map.js';
import teamContainer from './team-pictures-section/team-pictures.js';
import timelineContainer from './timeline-section/timeline-section.js';

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
    // logoTextContainer end

    // ideaSection start
    const ideaSectionTitle = document.createElement('h4');
    ideaSectionTitle.textContent = "What is the idea?";
    container.appendChild(ideaSectionTitle);

    const ideaSectionText = document.createElement('p');
    ideaSectionText.textContent = `Lucid dreaming (LD), the awareness of dreaming during sleep, has gained scientific interest due to its clinical potential and benefits, such as treating chronic nightmares, narcolepsy, and PTSD, as well as enhancing creativity and problem-solving. Eye movements performed after gaining dream awareness have become the research standard. Despite its promise, LD remains rare, with only 53% experiencing it once and 23% regularly (Saunders, 2016). This rarity poses challenges, as the neuroscience of LD is still partially understood.

Methods like Wake Back to Bed (WBTB), reality testing, and sensory stimulation during REM sleep aim to induce LD, but risks like sleep disruption and paralysis highlight the need for safer techniques. Neurobiological studies show changes in EEG patterns during LD but remain inconclusive due to methodological variability and participant differences.

The ISoLDE approach proposes large-scale collaborations and home-based studies using wearable EEG devices to address challenges like small sample sizes and costly lab setups. Involving LD enthusiasts with extensive experience may uncover nuances in the phenomenon and improve induction methods. Harnessing these insights could enhance both awareness and control in LD, paving the way for effective therapeutic applications.`
    container.appendChild(ideaSectionText);
    // ideaSection end

    // teamSection start

    const teamSectionTitle = document.createElement('h4');
    teamSectionTitle.textContent = "Team";
    container.appendChild(teamSectionTitle);

    container.appendChild(mapSection);
    container.appendChild(teamContainer);

    // teamSection end

    // Timeline Section
    const timelineSectionTitle = document.createElement('h4');
    timelineSectionTitle.textContent = "Timeline";
    container.appendChild(timelineSectionTitle);

    container.appendChild(timelineContainer);

    return container;
})();


export default aboutSubpage;