import '../components/components-loader.js';
import componentsLoader from '../components/components-loader.js';

let participateSubpage = (content) => {
    try {
        const container = document.createElement("div");
        container.classList.add("content-container");

        const reachOutSection = document.createElement("h4");
        reachOutSection.innerHTML = `Don’t wait—join us today!<br>Reach out to your <a href="" target="_blank">regional coordinator</a> and be part of something big.`;
        container.appendChild(reachOutSection);

        componentsLoader(content.participate, container);

        const widget = document.createElement("div");
        widget.innerHTML = '<iframe src="https://discord.com/widget?id=1344617246613307468&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>';
        widget.style.justifySelf = 'center';
        widget.style.justifyContent = 'center';
        widget.style.display = 'flex';
        widget.style.marginTop = '1rem';
        container.appendChild(widget);
        return container;
    }
    catch (error) {
        console.error("Error loading participate subpage:", error);
        const errorMessage = document.createElement("div");
        errorMessage.textContent = "An error occurred while loading the participate' information.";
        return errorMessage;
    }
};


export default participateSubpage;