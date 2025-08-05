import '../node_modules/modern-normalize/modern-normalize.css';
import './template.css';
import content from './content.json'
import aboutSubpage from './about/about.js';
import researchSubpage from './research/research.js';
import participateSubpage from './participate/participate.js';
import faqSubpage from './faq/faq.js';
import contactSubpage from './contant/contact.js';


(() => { // route pages
    const subpageContainer = document.querySelector(".subpage-container");
    const buttons = [
        document.querySelector("button.about"), 
        document.querySelector("button.research"), 
        document.querySelector("button.participate"),
        document.querySelector("button.faq"),
        document.querySelector("button.contact")
    ]
    const subpages = [
        aboutSubpage(content),
        researchSubpage(content),
        participateSubpage(content),
        faqSubpage(content),
        contactSubpage(content)
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

    // website initial content
    // force reload
    buttons[1].click();
    buttons[0].click();
})();
// const subpageContainer = document.querySelector(".subpage-container");
// const buttons = [
//     document.querySelector("button.about"), 
//     document.querySelector("button.research"), 
//     document.querySelector("button.participate"),
//     document.querySelector("button.faq"),
//     document.querySelector("button.contact")

// ]
// function hotswapContent(content){
//     console.log("Hotswapping content with:", content);
//     const subpages = [
//         aboutSubpage(content),
//         researchSubpage(content),
//         participateSubpage(content),
//         faqSubpage(content),
//         contactSubpage(content)
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

//     // const contactButton = document.querySelector("button.contact");
//     // contactButton.onclick = () => window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});

//     // website initial content
//     // force reload
//     buttons[1].click();
//     buttons[0].click();
// }


// hotswapContent(content);


// document.getElementById('submitBtn').addEventListener('click', function(e) {
//     e.preventDefault();
//     console.log("File input clicked");
    
//     const fileInput = document.getElementById('fileInput');
    
//     if (fileInput.files.length > 0) {
//         const file = fileInput.files[0];  // Get the first file
        
//         const reader = new FileReader();  // Create a FileReader instance
        
//         reader.onload = function(event) {
//             const fileContent = event.target.result;
//             hotswapContent(JSON.parse(fileContent));
//         };
//         reader.readAsText(file);
//     } else {
//         alert("No file selected.");
//     }
// });

// document.getElementById('closeBtn').addEventListener('click', function(e) {
//     document.querySelector(".swap-container").style.display = "none";
// });