import './researchers.css';
import content from '../content.json'
import componentsLoader from '../components/components-loader';

let researchersSubpage = (content) => {
    try {
        const container = document.createElement("div");
        container.classList.add("content-container");
        componentsLoader(content.researchers, container)
        return container;
    }
    catch (error) {
        console.error("Error loading researchers subpage:", error);
        const errorMessage = document.createElement("div");
        errorMessage.textContent = "An error occurred while loading the researchers' information.";
        return errorMessage;
    }
};


export default researchersSubpage;