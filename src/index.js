// Create a class for the element
class StackedSparklines extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const className = this.classList[0] || "default";
        const theme = this.getAttribute("data-theme") || className;
        const options = { theme, context: this };
        // const components = this.getAttribute("data-components");
        // if (components) {
        //     options.components = JSON.parse(components);
        // }
        // picobel(options);
        console.log("StackedSparklines connected, y'all!");
    }
}

if (typeof window !== "undefined" && "customElements" in window) {
    window.customElements.define("stacked-sparklines", StackedSparklines);
}
