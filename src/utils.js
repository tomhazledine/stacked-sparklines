export const getOptions = target => ({
    className: target.classList[0] || "default",
    caption: target.getAttribute("data-caption") || false,
    background: target.getAttribute("data-background") || "#fff000",
    foreground: target.getAttribute("data-foreground") || "#000fff",
    margin: target.getAttribute("data-margin") || 0.5,
    scale: target.getAttribute("data-scale") || 1,
    size: target.getAttribute("data-size") || 400,
    dataMax: target.getAttribute("data-max") || null,
    dataMin: target.getAttribute("data-min") || null,
    rowHeight: target.getAttribute("data-row-height") || 20,
    baseline: target.getAttribute("data-baseline") || false,
    labelLeft: target.getAttribute("data-label-left") || "",
    labelRight: target.getAttribute("data-label-right") || ""
});