const textSection = (content) => {
    const container = document.createElement("div");
    if (content.header) {
        const header = document.createElement("h4");
        header.textContent = content.header;
        container.appendChild(header);
    };
    if (content.paragraphs) {
        content.paragraphs.forEach(e => {
            const paragraph = document.createElement("p");
            paragraph.textContent = e;
            container.appendChild(paragraph);
        });
    };
    return container
};

export default textSection;