import './about.css';

let aboutSubpage = (() => {
    const container = document.createElement("div");
    container.classList.add("about-container");

    // logoTextContainer start
    const logoTextContainer = document.createElement("div");
    logoTextContainer.classList.add("logo-text-container");

    const logo = document.createElement("img");
    setTimeout(() => {
        logo.src = require('../img/isolde-logo.svg');
        logo.alt = "ISOLDE logo";
    }, 0);


    const logoTextRightSubContainer = document.createElement("div");
    logoTextRightSubContainer.classList.add("logo-text-subcontainer")

    const studyTitle = document.createElement('h3');
    studyTitle.textContent = "International Study on Lucid Dreaming Expertise";

    const studySubTitle = document.createElement('p');
    studySubTitle.textContent = "The first large-scale study of lucid dreaming";

    logoTextRightSubContainer.appendChild(studyTitle);
    logoTextRightSubContainer.appendChild(studySubTitle);

    logoTextContainer.appendChild(logo);
    logoTextContainer.appendChild(logoTextRightSubContainer);

    container.appendChild(logoTextContainer);
    // logoTextContainer end

    // ideaSection start
    const ideaSectionTitle = document.createElement('h4');
    ideaSectionTitle.textContent = "What is the idea?";
    container.appendChild(ideaSectionTitle);

    const ideaSectionText = document.createElement('p');
    ideaSectionText.textContent = `Lucid dreaming (LD), the awareness of dreaming during sleep, has gained scientific interest due to its clinical potential and benefits, such as treating chronic nightmares, narcolepsy, and PTSD, as well as enhancing creativity and problem-solving. Eye movements performed after gaining dream awareness have become the research standard. Despite its promise, LD remains rare, with only 53% experiencing it once and 23% regularly (Saunders, 2016). This rarity poses challenges, as the neuroscience of LD is still partially understood.

Methods like Wake Back to Bed (WBTB), reality testing, and sensory stimulation during REM sleep aim to induce LD, but risks like sleep disruption and paralysis highlight the need for safer techniques. Neurobiological studies show changes in EEG patterns during LD but remain inconclusive due to methodological variability and participant differences.

The ISoLDE approach proposes large-scale collaborations and home-based studies using wearable EEG devices to address challenges like small sample sizes and costly lab setups. Involving LD enthusiasts with extensive experience may uncover nuances in the phenomenon and improve induction methods. Harnessing these insights could enhance both awareness and control in LD, paving the way for effective therapeutic applications.`
    container.appendChild(ideaSectionText);
    // ideaSection end

    // teamSection start

    const teamSectionTitle = document.createElement('h4');
    teamSectionTitle.textContent = "Team";
    container.appendChild(teamSectionTitle);

    const mapContainer = document.createElement("div");
    mapContainer.classList.add("map-container");
    const map = document.createElement("img");
    setTimeout(() => {
        map.src = require('../img/map.svg');
        map.alt = "Map image";
    }, 0);
    map.classList.add("map-img");
    mapContainer.appendChild(map);
    container.appendChild(mapContainer);

    let mapPoints = [
        {x: 48.51, y: 43.84, text: "I'm point on the map!"},
        {x: 52.97, y: 44.89, text: "I'm point on the map!"},
        {x: 80.49, y: 80.18, text: "I'm point on the map!"}
    ];

    mapPoints.forEach((point) => {
        const pointDiv = document.createElement("div");
        pointDiv.classList.add("map-point");
        pointDiv.style.top = `${point.y}%`;
        pointDiv.style.left = `${point.x}%`;
        mapContainer.appendChild(pointDiv);
    });



    const teamContainer = document.createElement("div");
    teamContainer.classList.add("team-container");

    const teamProfiles = [
        { name: "Karolina Raczek", university: "JU, Poland", email: "Mail", img: require("../img/karolina.png") },
        { name: "Karolina Raczek", university: "JU, Poland", email: "Mail", img: require("../img/karolina.png") },
        { name: "Karolina Raczek", university: "JU, Poland", email: "Mail", img: require("../img/karolina.png") },
        { name: "Karolina Raczek", university: "JU, Poland", email: "Mail", img: require("../img/karolina.png") },
        { name: "Karolina Raczek", university: "JU, Poland", email: "Mail", img: require("../img/karolina.png") },
        { name: "Karolina Raczek", university: "JU, Poland", email: "Mail", img: require("../img/karolina.png") },
    ];

    teamProfiles.forEach(profile => {
        const profileDiv = document.createElement("div");
        profileDiv.classList.add("profile");

        const img = document.createElement("img");
        img.src = profile.img;
        img.alt = profile.name;

        const textDiv = document.createElement("div");
        textDiv.classList.add("profile-text");
        textDiv.innerHTML = `<strong>${profile.name}</strong><br>${profile.university}<br>${profile.email}`;

        profileDiv.appendChild(img);
        profileDiv.appendChild(textDiv);

        teamContainer.appendChild(profileDiv);
    });

    container.appendChild(teamContainer);
    // teamSection end

    // Timeline Section
    const timelineSectionTitle = document.createElement('h4');
    timelineSectionTitle.textContent = "Timeline";
    container.appendChild(timelineSectionTitle);

    const timelineContainer = document.createElement("div");
    timelineContainer.classList.add("timeline-container");

    const timelineEvents = [
        { date: "JANUARY 2025", description: "TEXT TEXT TEXTX" },
        { date: "DECEMBER 2025", description: "TEXT TEXT TEXTX" },
        { date: "JUNE 2026", description: "TEXT TEXT TEXTX" }
    ];

    timelineEvents.forEach((event, index) => {
        const eventDiv = document.createElement("div");
        eventDiv.classList.add("timeline-event", index % 2 === 0 ? "right" : "left");

        eventDiv.innerHTML = `
            <div class="content">
                <h5>${event.date}</h5>
                <p>${event.description}</p>
            </div>
        `;
        const circle = document.createElement("div");
        circle.classList.add("circle");
        timelineContainer.appendChild(circle);
        timelineContainer.appendChild(eventDiv);
    });

    container.appendChild(timelineContainer);


    return container;
})();


export default aboutSubpage;