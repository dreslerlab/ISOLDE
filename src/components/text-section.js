const textSection = (content) => {
    const container = document.createElement("div");
    if (content.header) {
        const header = document.createElement("h4");
        header.innerHTML = content.header;
        container.appendChild(header);
    };
    if (content.paragraphs) {
        content.paragraphs.forEach(e => {
            const paragraph = document.createElement("p");
            paragraph.innerHTML = e;
            container.appendChild(paragraph);
        });
    };
    return container
};

export default textSection;