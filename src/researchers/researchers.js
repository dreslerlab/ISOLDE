import './researchers.css';

let researchersSubpage = (() => {
    const container = document.createElement("div");

    const text = document.createElement("h1");
    text.textContent = "researchers subpage test";
    container.appendChild(text);
    return container;
})();


export default researchersSubpage;