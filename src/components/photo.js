const photo = (component) => {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.classList.add("img-component");
    setTimeout(() => img.src = component.url, 0);
    figure.appendChild(img);
    const figcaption = document.createElement("figcaption");
    figcaption.innerHTML = component.caption;
    figure.appendChild(figcaption);
    return figure;
};

export default photo;