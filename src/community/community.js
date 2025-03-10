import './community.css';
import componentsLoader from '../components/components-loader.js';

let communitySubpage = (content) => {
    const container = document.createElement("div");
    const communityLink = document.createElement("a");
    communityLink.target="_blank";
    communityLink.rel="noopener noreferrer";
    communityLink.href = "https://discord.com";
    communityLink.textContent = "Join the Lucid Dreaming Community on Discord: A Space for Practitioners and Researchers";
    container.appendChild(communityLink);
    const widget = document.createElement("div");
    widget.innerHTML = '<iframe src="https://discord.com/widget?id=1344617246613307468&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>';
    widget.style.justifySelf = 'center';
    widget.style.marginTop = '1rem';
    container.appendChild(widget);

    const insightsSectionTitle = document.createElement("h4");
    insightsSectionTitle.textContent = "Insights from our LD community";
    container.append(insightsSectionTitle);

    const insightsSectionImage = document.createElement("img");
    setTimeout(() => {
        insightsSectionImage.src = require("../img/discord.png");
        insightsSectionImage.alt = "Insigts examples screenprint";
        insightsSectionImage.style.maxWidth = `${100}%`;
    })
    container.appendChild(insightsSectionImage);
    componentsLoader(content.community, container);

    return container;
};


export default communitySubpage;