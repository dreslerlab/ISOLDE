import './participants.css';
import '../components/components-loader.js';
import componentsLoader from '../components/components-loader.js';

let participantsSubpage = (content) => {
    try {
        const container = document.createElement("div");
        container.classList.add("content-container");

        const reachOutSection = document.createElement("h4");
        reachOutSection.innerHTML = `Don’t wait—join us today!<br>Reach out to your <a href="" target="_blank">regional coordinator</a> and be part of something big.`;
        container.appendChild(reachOutSection);

        componentsLoader(content.participants, container);
        return container;
    }
    catch (error) {
        console.error("Error loading participants subpage:", error);
        const errorMessage = document.createElement("div");
        errorMessage.textContent = "An error occurred while loading the participants' information.";
        return errorMessage;
    }
};


export default participantsSubpage;