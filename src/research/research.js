import componentsLoader from '../components/components-loader';

let researchSubpage = (content) => {
    try {
        const container = document.createElement("div");
        container.classList.add("content-container");
        componentsLoader(content.research, container)
        return container;
    }
    catch (error) {
        console.error("Error loading research subpage:", error);
        const errorMessage = document.createElement("div");
        errorMessage.textContent = "An error occurred while loading the research' information.";
        return errorMessage;
    }
};


export default researchSubpage;