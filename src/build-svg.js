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

const renderCaption = ({
    caption,
    captionHtml,
    className,
    layout,
    foreground
}) => {
    if (!caption && !captionHtml) return "";

    const y = layout.height + layout.margin * 0.1;
    const fontSize = Math.floor(layout.height / 12);

    if (captionHtml) {
        const height = layout.margin - layout.margin * 0.1;
        return `<foreignObject x="0" y="${y}" width="${layout.width}" height="${height}" ><div class="${className}__caption" style="font-size: ${fontSize}px;text-align: center;color: ${foreground};" ><p>${captionHtml}</p></div></foreignObject>`;
    }

    return `<text class="${className}__caption" x="${
        layout.width / 2
    }" y="${y}" fill="${foreground}" font-size="${fontSize}" text-anchor="middle" alignment-baseline="hanging">${caption}</text>`;
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

    return `<?xml version="1.0" encoding="utf-8"?><svg xmlns="http://www.w3.org/2000/svg" class="${className}__inner" width="${size}" height="${size}" viewBox="${viewBox}" preserveAspectRatio="none" style="background-color: ${background}">${components}</svg>`;
};
