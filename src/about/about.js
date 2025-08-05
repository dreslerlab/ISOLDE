import './about.css';
import componentsLoader from '../components/components-loader.js';

let aboutSubpage = (content) => {
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


    logoTextRightSubContainer.appendChild(studyTitle);

    logoTextContainer.appendChild(logo);
    logoTextContainer.appendChild(logoTextRightSubContainer);

    container.appendChild(logoTextContainer);

    componentsLoader(content.about, container);
    return container;
};


export default aboutSubpage;