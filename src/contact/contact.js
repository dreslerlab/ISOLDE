import './contact.css';

let contactSubpage = (() => {
    const container = document.createElement("div");

    const text = document.createElement("h1");
    text.textContent = "Contact subpage test";
    container.appendChild(text);
    return container;
})();


export default contactSubpage;