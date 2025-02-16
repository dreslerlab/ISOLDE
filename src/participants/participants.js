import './participants.css';

let participantsSubpage = (() => {
    const container = document.createElement("div");

    const reachOutSection = document.createElement("h4");
    reachOutSection.innerHTML = `Don’t wait—join us today!<br>Reach out to your <a href="" target="_blank">regional coordinator</a> and be part of something big.`;
    container.appendChild(reachOutSection);

    const whoSectionTitle = document.createElement("h4");
    whoSectionTitle.textContent = "Who are we looking for?";
    container.appendChild(whoSectionTitle);

    const para1 = document.createElement("p");
    const para2 = document.createElement("p");
    para1.textContent = "Before the experiment, LD experts will fill out a battery of questionnaires (group A) and take part in micro-phenomenological interviews via zoom. The lucid dreaming experts will use a wearable EEG for ~4 weeks. They will record each night and complete questionnaires (group B) each evening/morning. Once a week, participants will be asked to fill out questionnaires from group C. When participants have lucid dreams, they should indicate their state using LRLR (left-right-left-right) visual signaling.";
    para2.textContent = "Participants should document their LD induction method in detail, either in writing or verbally, depending on their preference. For the first 3 weeks, participants will be asked to induce LD in the standard way; in the last week of the study, participants will be asked to stop induction (control week), however, continue to wear the EEG band. The control group will be gender- and age-matched with the LD expert group, never experiencing LD. They will be asked to wear a wearable EEG for a week while sleeping. Before the experiment, control group will fill out a battery of questionnaires (group A). They will record each night and complete questionnaires (group B) each evening/morning without free-form documentation. Once a week, participants will be asked to fill out questionnaires from group C.";
    container.appendChild(para1);
    container.appendChild(para2);
    return container;
})();


export default participantsSubpage;