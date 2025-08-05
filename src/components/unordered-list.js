const unorderedList = (content) => {
    const container = document.createElement("div");
    if (content.header) {
        const header = document.createElement("p");
        header.textContent = content.header;
        container.appendChild(header);
    };
    const list = document.createElement("ul");
    if (content.listItems) {
        content.listItems.forEach(e => {
            const item = document.createElement("li");
            item.innerHTML = e;
            list.appendChild(item);
        });
    };
    container.appendChild(list);
    return container
};

export default unorderedList;