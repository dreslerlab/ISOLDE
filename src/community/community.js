import './community.css';
import componentsLoader from '../components/components-loader.js';

let communitySubpage = (content) => {
    const container = document.createElement("div");
    container.classList.add("community-container");
    componentsLoader(content.community, container);
    const widget = document.createElement("div");
    widget.innerHTML = '<iframe src="https://discord.com/widget?id=1344617246613307468&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>';
    widget.style.justifySelf = 'center';
    widget.style.marginTop = '1rem';
    container.appendChild(widget);

    return container;
};


export default communitySubpage;