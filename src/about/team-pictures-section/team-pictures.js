import './team-pictures.css';

const teamContainer = (() => {
    
    const teamContainer = document.createElement("div");
    teamContainer.classList.add("team-container");

    const teamProfiles = [
        { name: "Karolina Raczek", university: "JU, Poland", email: "Mail", img: require("../../img/karolina.png") },
        { name: "Karolina Raczek", university: "JU, Poland", email: "Mail", img: require("../../img/karolina.png") },
        { name: "Karolina Raczek", university: "JU, Poland", email: "Mail", img: require("../../img/karolina.png") },
        { name: "Karolina Raczek", university: "JU, Poland", email: "Mail", img: require("../../img/karolina.png") },
        { name: "Karolina Raczek", university: "JU, Poland", email: "Mail", img: require("../../img/karolina.png") },
        { name: "Karolina Raczek", university: "JU, Poland", email: "Mail", img: require("../../img/karolina.png") },
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

    return teamContainer;
})();

export default teamContainer;