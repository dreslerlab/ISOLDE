import '../node_modules/modern-normalize/modern-normalize.css';
import './template.css';
import aboutSubpage from './about/about.js';
import researchersSubpage from './researchers/researchers.js';
import participantsSubpage from './participants/participants.js';
import communitySubpage from './community/community.js';
import contactSubpage from './contact/contact.js';

(() => {
    const subpageContainer = document.querySelector(".subpage-container");
    const aboutButton = document.querySelector("button.about");
    const researchersButton = document.querySelector("button.researchers");
    const participantsButton = document.querySelector("button.participants");
    const communityButton = document.querySelector("button.community");
    const contactButton = document.querySelector("button.contact");
    const switchSubpage = (subpage) => {
        subpageContainer.textContent = "";
        subpageContainer.appendChild(subpage);
    }
    aboutButton.onclick = () => switchSubpage(aboutSubpage);
    researchersButton.onclick = () => switchSubpage(researchersSubpage);
    participantsButton.onclick = () => switchSubpage(participantsSubpage);
    communityButton.onclick = () => switchSubpage(communitySubpage);
    contactButton.onclick = () => switchSubpage(contactSubpage);
    switchSubpage(aboutSubpage);
})();
