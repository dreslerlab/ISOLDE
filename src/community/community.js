import './community.css';

let communitySubpage = (() => {
    const container = document.createElement("div");

    const text = document.createElement("h1");
    text.textContent = "Community subpage test";
    container.appendChild(text);
    return container;
})();


export default communitySubpage;