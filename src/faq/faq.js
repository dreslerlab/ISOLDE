import './faq.css';
import componentsLoader from '../components/components-loader.js';

let faqSubpage = (content) => {
    const container = document.createElement("div");
    container.classList.add("faq-container");
    componentsLoader(content.faq, container);

    return container;
};


export default faqSubpage;