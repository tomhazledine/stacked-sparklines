# Stacked Sparklines

A [web component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) for creating a graph that shows a set of stacked [sparklines](https://en.wikipedia.org/wiki/Sparkline).

## Basic example

```html
<stacked-sparklines data-data="DATA_GOES_HERE" caption="Example data" data-background="#00b7c6" data-foreground="white">
    <!-- fallback content -->
</stacked-sparklines>
```

![Example graph showing two lines, one dropping, one rising](https://github.com/tomhazledine/stacked-sparklines/blob/main/images/demo01.svg)

## Installation

To install a web component you need to include the component's JavaScript file in your project. You can do this in one of two ways:

### Install JS from [npm](https://www.npmjs.com/package/stacked-sparklines)

If you're already using npm or yarn to handle your project's dependencies, you can add stacked-sparklines to your project using the following command:

```bash
# If you use yarn
yarn add stacked-sparklines

# If you use npm
npm install stacked-sparklines
```

Then you can import the stacked-sparklines module into your project:

```js
import "stacked-sparklines";
```

#### Install JS manually

If you prefer not to use npm, you can include the stacked-sparklines build file directly:

```html
<!-- Load Picobel -->
<script type='text/javascript' src='https://raw.githubusercontent.com/tomhazledine/stacked-sparklines/main/build/stacked-sparklines.0.0.1.js'></script>
```

### Use the component in your markup

Once you've included the stacked-sparklines module in your project, you can use the stacked-sparklines element in your HTML:

```html
<stacked-sparklines>
    <!-- fallback content -->
</stacked-sparklines>
```

## Options

All options are set as attributes on the `<stacked-sparklines>` element. For example, to set the `caption` option, you would add `data-caption="Example data"` to the `<stacked-sparklines>` element.

```html
<stacked-sparklines data-data="[[1,2,3,4],[5,6,7,8]]" data-caption="Example data"></stacked-sparklines>
```

### `data-data` (required)

This is the data that will be rendered into the SVG graph. We're drawing a stack of lines, so the `data` option expects an array of arrays (one array for each line to be drawn).

> **Note:** the component only requires the y-axis values for each line. The x-axis values are taken from the index of each value in the array. For this reason, it's important that each line has the same number of values (if you want all the sparklines to line up neatly).

```html
<stacked-sparklines data-data="[[1,2,3,4],[5,6,7,8]]"></stacked-sparklines>
```

The data should be provided as a string that can be parsed into a JavaScript array. The example above would render a graph with two lines: one with values `[1,2,3,4]` and one with values `[5,6,7,8]`.

If no data is provided, the component won't render anything.

### `data-caption`

This is a string that will be rendered as a caption below the graph.

### `data-caption-html`

This is a string that will be rendered as a caption below the graph. It will be rendered as HTML, so you can include links, formatting-tags, etc.

### `data-background` and `data-foreground`

These are the colours that will be used for the graph's background and foreground. They can be provided as any value that would be accepted by CSS (e.g. `#00b7c6`, `rgb(0,183,198)`, `hsl(185,100%,39%)`, `--custom-property-name`, etc.).

### `data-size`

This is the size of the graph, in pixels. The graphs are square, so this value defines both the `width` and `height` of the rendered SVG.

### `data-margin`

This is the margin around the graph. It defines the percentage margin rendered around the outside of the graph, so should be a number between `0` and `1` (e.g. `0.1` for 10% margin).

### `scale`

This is the amount the SVG canvas is scaled by, and should be a number greater than `0` (e.g. `1` for 100% scale).

Higher values (e.g. `2`) will result in narrower graph lines and smaller text, while lower values (e.g. `0.5`) will result in thicker graph lines and larger text. Think of `scale` as a zoom level for the graph that does not affect the width and height.

> #### Why do we need to care about scale?
> 
> Using pixels in SVGs can be a bit weird. SVGs don't have an intrinsic unit of measurement, so when you define a width or height in an SVG the default unit is "user units", which are relative to the viewBox of the SVG. This means an SVG line can be styled with CSS and set to 1px, but what's really being set is 1 user unit **which could be any number of pixels depending on the viewBox and the outer dimensions of the SVG element**. Adding a responsive percentage width to the SVG (e.g. `width: 100%`) further breaks the connection between CSS "px" and rendered pixels in the final SVG.
>
> Setting the `scale` option essentially effects how large a "pixel" is within the rendered graph.

### `max` and `min`

These are the maximum and minimum values that will be used to scale the graph. If not provided, the graph will be scaled to the maximum and minimum values in the data.

### `row-height`

This is the height of each row in the graph. It defines the percentage of the available space that each row will take up, so should be a number between `0` and `1` (e.g. `0.1` for 10% of the available space).

### `baseline`

This is the baseline value for the graph. It defines the value that will be used as the baseline for the graph. If not provided, the baseline will be set to `0`.

### `label-left` and `label-right`

These are the text labels that will be rendered to the left and right of the graph.

## Classes and styling

The stacked-sparklines component will inherit any `class` value applied to it.

```html
<stacked-sparklines class="my-custom-class"></stacked-sparklines>
```

This class name will be used as the prefix for all internal class names, following [Block Element Modifier (BEM)](https://css-tricks.com/bem-101/) conventions.

The default class name is `"default"`.

### Provided class names

Replace `PREFIX` with the class name you've applied to the stacked-sparklines element.

* `.PREFIX`: the root element (a.k.a. the `<stacked-sparklines>` component itself)
* `.PREFIX__inner`: the `<svg>` element (the direct child of the `<stacked-sparklines>` component)
* `.PREFIX__area`: the area under the lines
* `.PREFIX__line`: the lines themselves
* `.PREFIX__caption`: the caption below the graph (optional) 
* `.PREFIX__label`: the labels at the top of the graph (optional) 
* `.PREFIX__label--left`: the label on the top-left of the graph (optional) 
* `.PREFIX__label--right`: the label on the top-right of the graph (optional) 