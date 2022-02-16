<template>
    <div class="cssFilter"></div>
    <div class="svgFilter"></div>

    <svg>
        <defs>
            <filter id="blur">
                <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
            </filter>
        </defs>
    </svg>
</template>

<style scoped>
div {
    width: 100px;
    height: 100px;
    background: #000;
    display: inline-block;
    margin: 0 30px;
}
.cssFilter {
    filter: blur(5px);
}
.svgFilter {
    filter: url(#blur);
}
</style>