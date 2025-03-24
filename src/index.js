import '../node_modules/modern-normalize/modern-normalize.css';
import './template.css';
import content from './content.json'
import aboutSubpage from './about/about.js';
import researchersSubpage from './researchers/researchers.js';
import participantsSubpage from './participants/participants.js';
import communitySubpage from './community/community.js';


// (() => { // route pages
//     const subpageContainer = document.querySelector(".subpage-container");
//     const buttons = [
//         document.querySelector("button.about"), 
//         document.querySelector("button.researchers"), 
//         document.querySelector("button.participants"),
//         document.querySelector("button.community"),
//         // document.querySelector("button.contact")
//     ]
//     const subpages = [
//         aboutSubpage(content),
//         researchersSubpage(content),
//         participantsSubpage(content),
//         communitySubpage(content),
//         // contactSubpage
//     ]
//     const switchSubpage = (subpage) => {
//         subpageContainer.textContent = "";
//         subpageContainer.appendChild(subpage);
//     }

//     buttons.forEach((btn, i) => btn.onclick = () => {
//         switchSubpage(subpages[i]);
//         buttons.forEach(button => button.disabled = false);
//         btn.disabled = true;
//     });

//     const contactButton = document.querySelector("button.contact");
//     contactButton.onclick = () => window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});

//     // website initial content
//     buttons[0].click();
// })();
const subpageContainer = document.querySelector(".subpage-container");
const buttons = [
    document.querySelector("button.about"), 
    document.querySelector("button.researchers"), 
    document.querySelector("button.participants"),
    document.querySelector("button.community"),
    // document.querySelector("button.contact")
]
function hotswapContent(content){
    

    const subpages = [
        aboutSubpage(content),
        researchersSubpage(content),
        participantsSubpage(content),
        communitySubpage(content),
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
}


hotswapContent(content);


document.getElementById('submitBtn').addEventListener('click', function(e) {
    e.preventDefault();
    
    const fileInput = document.getElementById('fileInput');
    
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];  // Get the first file
        
        const reader = new FileReader();  // Create a FileReader instance
        
        reader.onload = function(event) {
            const fileContent = event.target.result;
            hotswapContent(JSON.parse(fileContent));
        };
        reader.readAsText(file);
    } else {
        alert("No file selected.");
    }
});

document.getElementById('closeBtn').addEventListener('click', function(e) {
    document.querySelector(".swap-container").style.display = "none";
});