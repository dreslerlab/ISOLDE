import './about.css';

let aboutSubpage = (() => {
    const container = document.createElement("div");

    const text = document.createElement("h1");
    text.textContent = "About subpage test";
    container.appendChild(text);
    return container;
})();


export default aboutSubpage;