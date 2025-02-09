import './participants.css';

let participantsSubpage = (() => {
    const container = document.createElement("div");

    const text = document.createElement("h1");
    text.textContent = "participants subpage test";
    container.appendChild(text);
    return container;
})();


export default participantsSubpage;