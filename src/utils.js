export const getOptions = target => ({
    className: target.classList[0] || "default",
    caption: target.getAttribute("data-caption") || false,
    captionHtml: target.getAttribute("data-caption-html") || false,
    background: target.getAttribute("data-background") || "#efeeeb",
    foreground: target.getAttribute("data-foreground") || "#666",
    margin: target.getAttribute("data-margin") || 0.5,
    scale: target.getAttribute("data-scale") || 1,
    size: target.getAttribute("data-size") || 400,
    dataMax: target.getAttribute("data-max") || null,
    dataMin: target.getAttribute("data-min") || null,
    rowHeight: target.getAttribute("data-row-height") || null,
    baseline: target.getAttribute("data-baseline") || false,
    labelLeft: target.getAttribute("data-label-left") || "",
    labelRight: target.getAttribute("data-label-right") || ""
});
