import { StackedSparklines } from "./core";

import { data } from "./test-data";

// Create a class for the element
class StackedSparklinesComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const className = this.classList[0] || "default";
        const caption = this.getAttribute("data-caption") || false;
        const background = this.getAttribute("data-background") || "#fff000";
        const foreground = this.getAttribute("data-foreground") || "#000fff";
        const margin = this.getAttribute("data-margin") || 0.5;
        const scale = this.getAttribute("data-scale") || 1;
        const size = this.getAttribute("data-size") || 400;
        const dataMax = this.getAttribute("data-max") || null;
        const dataMin = this.getAttribute("data-min") || null;
        const rowHeight = this.getAttribute("data-row-height") || 20;
        const baseline = this.getAttribute("data-baseline") || false;
        const labelLeft = this.getAttribute("data-label-left") || "";
        const labelRight = this.getAttribute("data-label-right") || "";

        let rawData;
        try {
            rawData = JSON.parse(this.getAttribute("data-data")) || [[]];
        } catch (error) {
            console.warn(
                "StackedSparklines requires the data-data attribute to be a valid JSON array."
            );
            return;
        }
        if (!Array.isArray(rawData) || !Array.isArray(rawData[0])) {
            console.warn(
                "StackedSparklines requires data-data attribute to be an array of arrays."
            );
            return;
        }

        const output = StackedSparklines({
            // data: rawData,
            data,
            className,
            size,
            scale,
            margin,
            rowHeight,
            baseline,
            labelLeft,
            labelRight,
            caption,
            dataMax,
            dataMin,
            background,
            foreground
        });
        this.innerHTML = output;
    }
}

if (typeof window !== "undefined" && "customElements" in window) {
    window.customElements.define(
        "stacked-sparklines",
        StackedSparklinesComponent
    );
}
