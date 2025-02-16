import '../node_modules/modern-normalize/modern-normalize.css';
import './template.css';
import aboutSubpage from './about/about.js';
import researchersSubpage from './researchers/researchers.js';
import participantsSubpage from './participants/participants.js';
import communitySubpage from './community/community.js';


(() => { // route pages
    const subpageContainer = document.querySelector(".subpage-container");
    const buttons = [
        document.querySelector("button.about"), 
        document.querySelector("button.researchers"), 
        document.querySelector("button.participants"),
        document.querySelector("button.community"),
        // document.querySelector("button.contact")
    ]
    const subpages = [
        aboutSubpage,
        researchersSubpage,
        participantsSubpage,
        communitySubpage,
        // contactSubpage
    ]
    const switchSubpage = (subpage) => {
        subpageContainer.textContent = "";
        subpageContainer.appendChild(subpage);
    }

    buttons.forEach((btn, i) => btn.onclick = () => {
        switchSubpage(subpages[i]);
        buttons.forEach(button => button.disabled = false);
        btn.disabled = true;
    });

    const contactButton = document.querySelector("button.contact");
    contactButton.onclick = () => window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});

    // website initial content
    buttons[0].click();
})();
