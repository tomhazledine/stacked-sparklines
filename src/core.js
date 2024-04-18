import { scaleLinear } from "d3-scale";
import { area, line } from "d3-shape";

import { renderGraph } from "./build-svg";

export const StackedSparklines = options => {
    const layout = {
        width: 100 * options.scale,
        height: 100 * options.scale,
        margin: 100 * options.scale * options.margin
    };

    const dataMax =
        options.dataMax ??
        options.data.reduce((acc, row) => Math.max(acc, Math.max(...row)), 0);
    const dataMin =
        options.dataMin ??
        options.data.reduce(
            (acc, row) => Math.min(acc, Math.min(...row)),
            Infinity
        );

    // Define the `x` and `y` scales
    const xScale = scaleLinear()
        .domain([0, options.data[0].length - 1])
        .range([0, layout.width]);

    const rowGap = layout.height / (options.data.length - 1);
    const rowHeightMultiplier =
        options.rowHeight ?? (options.data.length * 2) / 100;
    const rowHeight = layout.height * rowHeightMultiplier;

    console.log({ options, layout, rowHeightMultiplier, rowHeight });

    const rows = options.data
        // Reverse #1: ensure first row appears at top of graph
        .reverse()
        .map((row, i) => {
            const rowBaseline = layout.height - i * rowGap;
            const yRange = [rowBaseline, rowBaseline - rowHeight];

            const yScale = scaleLinear()
                .domain([dataMin, dataMax])
                .range(yRange);

            const lineGenerator = line()
                .x((_, d) => xScale(d))
                .y(d => yScale(d));
            const areaGenerator = area()
                .x((_, d) => xScale(d))
                .y0(() => yScale(options.baseline ?? dataMin))
                .y1(d => yScale(d));

            return { line: lineGenerator(row), area: areaGenerator(row) };
        })
        // Reverse #2: render top to bottom to ensure overlaps are correct
        .reverse();

    const viewBox = `${-layout.margin} ${-layout.margin} ${
        layout.width + layout.margin * 2
    } ${layout.height + layout.margin * 2}`;

    const markup = renderGraph({
        ...options,
        rows,
        viewBox,
        layout
    });

    return markup;
};
