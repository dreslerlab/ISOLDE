import './researchers.css';
import content from '../content.json'
import componentsLoader from '../components/components-loader';

let researchersSubpage = (content) => {
    const container = document.createElement("div");
    container.classList.add("content-container");
    componentsLoader(content.researchers, container)
    return container;
};


export default researchersSubpage;