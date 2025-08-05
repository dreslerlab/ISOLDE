import componentsLoader from '../components/components-loader.js';

let contactSubpage = (content) => {
    const container = document.createElement("div");
    container.classList.add("content-container");
    componentsLoader(content.contact, container);
    return container;
};


export default contactSubpage;