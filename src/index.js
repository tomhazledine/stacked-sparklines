import { StackedSparklines } from "./core";

import { getOptions } from "./utils";
import { data as testData } from "./test-data";

class StackedSparklinesComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Get the options from the element's attributes
        const options = getOptions(this);

        let rawData;

        const useTestData = this.getAttribute("data-test");
        if (useTestData) {
            // Use the test data
            rawData = testData;
        } else {
            // Get the data from the element's data-data attribute (and validate it!)
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
        }

        // Get the complete graph
        const output = StackedSparklines({
            data: rawData,
            ...options
        });

        // Render the graph
        this.innerHTML = output;
    }
}

if (typeof window !== "undefined" && "customElements" in window) {
    window.customElements.define(
        "stacked-sparklines",
        StackedSparklinesComponent
    );
}
