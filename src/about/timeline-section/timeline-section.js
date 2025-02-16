import './timeline-section.css';

const timelineSection = (() => {
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

    return timelineContainer;
})();

export default timelineSection;