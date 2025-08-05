import './team-pictures.css';

const teamContainer = (teamProfiles) => {
    
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

    return teamContainer;
};

export default teamContainer;