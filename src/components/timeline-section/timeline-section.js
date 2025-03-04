import './timeline-section.css';

const timelineSection = (componentJSON) => {
    const timelineEvents = componentJSON.timelineEvents;
    const timelineContainer = document.createElement("div");

    if (componentJSON.header) {
        const header = document.createElement("h4");
        header.textContent = componentJSON.header;
        timelineContainer.appendChild(header);
    }

    timelineContainer.classList.add("timeline-container");

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

    return timelineContainer;
};

export default timelineSection;