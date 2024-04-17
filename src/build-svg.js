const renderRow = ({ area, line, className, background, foreground }) => {
    return `<g>
        <path
            class="${className}__area"
            fill="${background}"
            stroke="none"
            d="${area}"
        ></path>
        <path
            class="${className}__line"
            fill="none"
            stroke="${foreground}"
            d="${line}"
        ></path>
    </g>`;
};

const renderCaption = ({ caption, className, layout, foreground }) => {
    if (!caption) return "";

    return `<foreignObject
                    x="0"
                    y="${layout.height + layout.margin * 0.1}"
                    width="${layout.width}"
                    height="${layout.margin - layout.margin * 0.1}"
                    ><div class="${className}__caption" style="font-size: ${Math.floor(
        layout.height / 12
    )}px;text-align: center;color: ${foreground};" ><p>${caption}</p></div></foreignObject>`;
};

const renderLabel = ({ layout, text, alignment, className, foreground }) => {
    if (!text) return "";

    const x = alignment === "left" ? 0 : layout.width;
    const y = 0 - layout.margin * 0.1;
    const textAnchor = alignment === "left" ? "start" : "end";

    const classes = `${className}__label ${className}__label--${alignment}"`;

    return `<text class="${classes}"
            x="${x}"
            y="${y}"
            fill="${foreground}"
            font-size="${Math.floor(layout.height / 12)}"
            text-anchor="${textAnchor}"
        >${text}</text>`;
};

export const renderGraph = options => {
    const renderedCaption = renderCaption(options);
    const renderedLeftLabel = renderLabel({
        text: options.labelLeft,
        alignment: "left",
        ...options
    });
    const renderedRightLabel = renderLabel({
        text: options.labelRight,
        alignment: "right",
        ...options
    });

    const renderedRows = options.rows
        .map(({ area, line }) => renderRow({ ...options, area, line }))
        .join("");

    const components = [
        renderedLeftLabel,
        renderedRightLabel,
        renderedCaption,
        renderedRows
    ].join("");

    const { className, size, viewBox, background } = options;

    return `<svg class="${className}" width="${size}" viewBox="${viewBox}" preserveAspectRatio="none" style="background-color: ${background}">${components}</svg>`;
};
