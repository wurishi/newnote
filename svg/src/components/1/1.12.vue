<template>
    <svg
        width="600px"
        height="600px"
        viewBox="-300 -300 600 600"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlns:xlink="http://www.w3.org/1999/xlink"
    >
        <title>SVG demonstration</title>
        <desc>Mozilla CSS Getting Started - SVG demonstration</desc>

        <defs>
            <g id="segment" class="segment">
                <path class="segment-fill" d="M0,0 v-200 a40,40 0 0,0 -62,10 z" />
                <path class="segment-edge" d="M0,-200 a40,40 0 0,0 -62,10" />
            </g>
            <g id="quadrant">
                <use xlink:href="#segment" />
                <use xlink:href="#segment" transform="rotate(18)" />
                <use xlink:href="#segment" transform="rotate(36)" />
                <use xlink:href="#segment" transform="rotate(54)" />
                <use xlink:href="#segment" transform="rotate(72)" />
            </g>
            <g id="petals">
                <use xlink:href="#quadrant" />
                <use xlink:href="#quadrant" transform="rotate(90)" />
                <use xlink:href="#quadrant" transform="rotate(180)" />
                <use xlink:href="#quadrant" transform="rotate(270)" />
            </g>
            <radialGradient id="fade" cx="0" cy="0" r="200" gradientUnits="userSpaceOnUse">
                <stop id="fade-stop-1" offset="33%" />
                <stop id="fade-stop-2" offset="95%" />
            </radialGradient>
        </defs>

        <text id="heading" x="-280" y="-270">SVG demonstration</text>
        <text id="caption" x="-280" y="-250">Move your mouse pointer over the flower.</text>

        <g id="flower">
            <circle id="overlay" cx="0" cy="0" r="200" stroke="none" fill="url(#fade)" />
            <use id="outer-petals" xlink:href="#petals" />
            <!-- <use id="inner-petals" xlink:href="#petals" transform="rotate(9) scale(0.33)" /> -->
        </g>
    </svg>
</template>

<style scoped>
/*** SVG demonstration ***/

/* page */
svg {
    background-color: beige;
}

#heading {
    font-size: 24px;
    font-weight: bold;
}

#caption {
    font-size: 12px;
}

/* flower */
#flower:hover {
    cursor: crosshair;
}

/* gradient */
#fade-stop-1 {
    stop-color: blue;
}

#fade-stop-2 {
    stop-color: white;
}

/* outer petals */
#outer-petals {
    opacity: 0.75;
}

#outer-petals .segment-fill {
    fill: azure;
    stroke: lightsteelblue;
    stroke-width: 1;
}

#outer-petals .segment-edge {
    fill: none;
    stroke: deepskyblue;
    stroke-width: 3;
}

#outer-petals .segment:hover > .segment-fill {
    fill: plum;
    stroke: none;
}

#outer-petals .segment:hover > .segment-edge {
    stroke: slateblue;
}

/* inner petals */
#inner-petals .segment-fill {
    fill: yellow;
    stroke: yellowgreen;
    stroke-width: 1;
}

#inner-petals .segment-edge {
    fill: none;
    stroke: yellowgreen;
    stroke-width: 9;
}

#inner-petals .segment:hover > .segment-fill {
    fill: darkseagreen;
    stroke: none;
}

#inner-petals .segment:hover > .segment-edge {
    stroke: green;
}

/* 改变颜色 */

#inner-petals {
    --segment-fill-fill-hover: pink;
}

/* Non-standard way for some older browsers */
#inner-petals:hover .segment-fill {
    fill: pink;
    stroke: none;
}
</style>