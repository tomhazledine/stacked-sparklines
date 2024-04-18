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

### `-data` (required)

Without any data, the component won't render anything. The data should be a nested 2D array of numbers. For example:

```html
<stacked-sparklines data-data="[[1,2,3,4],[5,6,7,8]]"></stacked-sparklines>
```
