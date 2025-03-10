import './community.css';
import content from '../content.json'
import componentsLoader from '../components/components-loader.js';

let communitySubpage = (() => {
    const container = document.createElement("div");
    const communityLink = document.createElement("a");
    communityLink.target="_blank";
    communityLink.rel="noopener noreferrer";
    communityLink.href = "https://discord.com";
    communityLink.textContent = "Join the Lucid Dreaming Community on Discord: A Space for Practitioners and Researchers";
    container.appendChild(communityLink);
    const widget = document.createElement("div");
    widget.innerHTML = '<iframe src="https://discord.com/widget?id=1344617246613307468&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>';
    widget.style.justifySelf = 'center';
    widget.style.marginTop = '1rem';
    container.appendChild(widget);

    const insightsSectionTitle = document.createElement("h4");
    insightsSectionTitle.textContent = "Insights from our LD community";
    container.append(insightsSectionTitle);

    const insightsSectionImage = document.createElement("img");
    setTimeout(() => {
        insightsSectionImage.src = require("../img/discord.png");
        insightsSectionImage.alt = "Insigts examples screenprint";
        insightsSectionImage.style.maxWidth = `${100}%`;
    })
    container.appendChild(insightsSectionImage);

    const discordExpectationsSectionTitle = document.createElement("h4");
    discordExpectationsSectionTitle.textContent = "What can you expect from the Discord community?";
    container.appendChild(discordExpectationsSectionTitle);

    const para1 = document.createElement("p");
    para1.textContent = "For Practitioners:";
    container.appendChild(para1);

    const ul1 = document.createElement("ul");
    const li1 = document.createElement("li");
    const li2 = document.createElement("li");
    const li3 = document.createElement("li");
    li1.textContent = "Connect with Researchers and Fellow Dreamers: Share your lucid dreaming experiences and techniques with both fellow practitioners and experts in the field. Learn new methods for inducing and controlling dreams, as well as how lucid dreaming can enhance creativity and problem-solving.";
    li2.textContent = "Support and Advice: The community is a space for support. Whether you're struggling with dream recall, trying to enhance your control during lucid dreams, or facing specific challenges like nightmares, you’ll find guidance and encouragement from those with similar experiences.";
    li3.textContent = "Share Your Journey: Discuss your experiences with others, ask questions, and share insights about the emotional and cognitive aspects of lucid dreaming. Your story could help researchers refine their understanding of this fascinating phenomenon.";
    ul1.appendChild(li1);
    ul1.appendChild(li2);
    ul1.appendChild(li3);
    container.appendChild(ul1);

    const para2 = document.createElement("p");
    para2.textContent = "For Researchers:";
    container.appendChild(para2);
    const ul2 = document.createElement("ul");
    const li4 = document.createElement("li");
    const li5 = document.createElement("li");
    const li6 = document.createElement("li");
    li4.textContent = "Real-World Insights: Gain direct access to a wealth of real-life experiences from lucid dreamers. This feedback can provide valuable context for your studies and spark new research questions or directions.";
    li5.textContent = "Collaborative Research Opportunities: The Discord community encourages collaboration, whether through informal discussions or more formal research projects. Researchers can engage with practitioners to refine experimental designs, develop new theories, or test out ideas in the field of lucid dreaming.";
    li6.textContent = "Access to a Global Community: Researchers from around the world can interact with lucid dreamers and fellow scientists, enriching the depth and breadth of their work.";
    ul2.appendChild(li4);
    ul2.appendChild(li5);
    ul2.appendChild(li6);
    container.appendChild(ul2);

    const whyDiscordSectionTitle = document.createElement("h4");
    whyDiscordSectionTitle.textContent = "Why Discord?";
    container.appendChild(whyDiscordSectionTitle);

    const whyDiscordSectionText = document.createElement("p");
    whyDiscordSectionText.textContent = `Discord is the perfect platform for building a close-knit, global community. It offers real-time communication, easy-to-navigate channels for discussions, and the ability to organize events like webinars, Q&A sessions, and collaborative brainstorming. Members can join different channels focused on topics like dream induction techniques, scientific findings, or mental health applications of lucid dreaming. It’s a space that grows and evolves with the community, offering a variety of ways to engage, learn, and connect.`;
    container.appendChild(whyDiscordSectionText);

    const howToJoinSectionTitle = document.createElement("h4");
    howToJoinSectionTitle.textContent = "How to join?";
    container.appendChild(howToJoinSectionTitle);

    const howToJoinSectionPara1 = document.createElement("p");
    const howToJoinSectionPara2 = document.createElement("p");
    howToJoinSectionPara1.textContent = "It’s easy to get started! Simply join our Lucid Dreaming Discord Community and begin exploring. Whether you’re here to learn more about lucid dreaming or to contribute your own knowledge and experiences, there’s a place for you. Connect with like-minded individuals, attend events, share your insights, and help us advance the collective understanding of lucid dreaming.";
    howToJoinSectionPara2.textContent = "By joining our Discord community, you’re not just joining a server—you’re becoming part of a global effort to build a stronger connection between lucid dreamers and researchers. Together, we can push the boundaries of this fascinating field and make a real impact on our understanding of consciousness, sleep, and the human mind.";
    container.appendChild(howToJoinSectionPara1);
    container.appendChild(howToJoinSectionPara2);


    return container;
})();


export default communitySubpage;