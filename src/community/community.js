import './community.css';

let communitySubpage = (() => {
    const container = document.createElement("div");
    const communityLink = document.createElement("a");
    communityLink.target="_blank";
    communityLink.rel="noopener noreferrer";
    communityLink.href = "https://discord.com";
    communityLink.textContent = "Join the Lucid Dreaming Community on Discord: A Space for Practitioners and Researchers";
    container.appendChild(communityLink);

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

    const discordExpectationsSectionText = document.createElement("p");
    discordExpectationsSectionText.textContent = `For Practitioners:
Connect with Researchers and Fellow Dreamers: Share your lucid dreaming experiences and techniques with both fellow practitioners and experts in the field. Learn new methods for inducing and controlling dreams, as well as how lucid dreaming can enhance creativity and problem-solving.
Support and Advice: The community is a space for support. Whether you're struggling with dream recall, trying to enhance your control during lucid dreams, or facing specific challenges like nightmares, you’ll find guidance and encouragement from those with similar experiences.
Share Your Journey: Discuss your experiences with others, ask questions, and share insights about the emotional and cognitive aspects of lucid dreaming. Your story could help researchers refine their understanding of this fascinating phenomenon.

For Researchers:
Real-World Insights: Gain direct access to a wealth of real-life experiences from lucid dreamers. This feedback can provide valuable context for your studies and spark new research questions or directions.
Collaborative Research Opportunities: The Discord community encourages collaboration, whether through informal discussions or more formal research projects. Researchers can engage with practitioners to refine experimental designs, develop new theories, or test out ideas in the field of lucid dreaming.
Access to a Global Community: Researchers from around the world can interact with lucid dreamers and fellow scientists, enriching the depth and breadth of their work.`;
    container.appendChild(discordExpectationsSectionText);

    const whyDiscordSectionTitle = document.createElement("h4");
    whyDiscordSectionTitle.textContent = "Why Discord?";
    container.appendChild(whyDiscordSectionTitle);

    const whyDiscordSectionText = document.createElement("p");
    whyDiscordSectionText.textContent = `Discord is the perfect platform for building a close-knit, global community. It offers real-time communication, easy-to-navigate channels for discussions, and the ability to organize events like webinars, Q&A sessions, and collaborative brainstorming. Members can join different channels focused on topics like dream induction techniques, scientific findings, or mental health applications of lucid dreaming. It’s a space that grows and evolves with the community, offering a variety of ways to engage, learn, and connect.`;
    container.appendChild(whyDiscordSectionText);

    const howToJoinSectionTitle = document.createElement("h4");
    howToJoinSectionTitle.textContent = "How to join?";
    container.appendChild(howToJoinSectionTitle);

    const howToJoinSectionText = document.createElement("p");
    howToJoinSectionText.textContent = `It’s easy to get started! Simply join our Lucid Dreaming Discord Community and begin exploring. Whether you’re here to learn more about lucid dreaming or to contribute your own knowledge and experiences, there’s a place for you. Connect with like-minded individuals, attend events, share your insights, and help us advance the collective understanding of lucid dreaming.

By joining our Discord community, you’re not just joining a server—you’re becoming part of a global effort to build a stronger connection between lucid dreamers and researchers. Together, we can push the boundaries of this fascinating field and make a real impact on our understanding of consciousness, sleep, and the human mind.`;
    container.appendChild(howToJoinSectionText);


    return container;
})();


export default communitySubpage;