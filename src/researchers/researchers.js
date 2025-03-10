import './researchers.css';
import content from '../content.json'
import componentsLoader from '../components/components-loader';

let researchersSubpage = (() => {
    const container = document.createElement("div");
    componentsLoader(content.researchers, container)
    return container;
})();


export default researchersSubpage;