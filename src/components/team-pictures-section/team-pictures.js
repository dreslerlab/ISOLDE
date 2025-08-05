import './team-pictures.css';

const teamContainer = (component) => {
    const teamProfiles = component.people || [];
    const headerText = component.header || undefined;
    const teamOuterContainer = document.createElement("div");
    teamOuterContainer.classList.add("team-outer-container");
    console.log("teamProfiles", component);
    console.log("headerText", headerText);
    if (headerText) {
        const header = document.createElement("h4");
        header.innerHTML = headerText;
        if (component.boldedHeader) {
            header.style.fontWeight = "bold";
        }
        teamOuterContainer.appendChild(header);
    }

    const teamContainer = document.createElement("div");
    teamContainer.classList.add("team-container");


    teamProfiles.forEach(profile => {
        const profileDiv = document.createElement("div");
        profileDiv.classList.add("profile");

        const img = document.createElement("img");
        img.src = profile.url;
        img.alt = profile.name;
        
        const textDiv = document.createElement("div");
        textDiv.classList.add("profile-text");
        textDiv.innerHTML = `<strong>${profile.name ? profile.name : ""}</strong><br>${profile.university ? profile.university : ""}<br>${profile.email ? profile.email : ""}`;

        profileDiv.appendChild(img);
        profileDiv.appendChild(textDiv);

        teamContainer.appendChild(profileDiv);
    });
    teamOuterContainer.appendChild(teamContainer);
    return teamOuterContainer;
};

export default teamContainer;