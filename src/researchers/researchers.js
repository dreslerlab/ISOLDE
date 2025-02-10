import './researchers.css';

let researchersSubpage = (() => {
    const container = document.createElement("div");
    const dataSectionTitle = document.createElement("h4");
    dataSectionTitle.textContent = "Data colletion";
    container.appendChild(dataSectionTitle);

    const dataSectionText = document.createElement("p");
    dataSectionText.textContent = `Before the experiment, LD experts will fill out a battery of questionnaires (group A) and take part in micro-phenomenological interviews via zoom. The lucid dreaming experts will use a wearable EEG for ~4 weeks. They will record each night and complete questionnaires (group B) each evening/morning. Once a week, participants will be asked to fill out questionnaires from group C. When participants have lucid dreams, they should indicate their state using LRLR (left-right-left-right) visual signaling. Participants should document their LD induction method in detail, either in writing or verbally, depending on their preference. For the first 3 weeks, participants will be asked to induce LD in the standard way; in the last week of the study, participants will be asked to stop induction (control week), however, continue to wear the EEG band. The control group will be gender- and age-matched with the LD expert group, never experiencing LD. They will be asked to wear a wearable EEG for a week while sleeping. Before the experiment, control group will fill out a battery of questionnaires (group A). They will record each night and complete questionnaires (group B) each evening/morning without free-form documentation. Once a week, participants will be asked to fill out questionnaires from group C.`;
    container.appendChild(dataSectionText);
    return container;
})();


export default researchersSubpage;