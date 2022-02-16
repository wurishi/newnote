<template>
    <svg width="120" height="340">
        <defs>
            <linearGradient id="Gradient1">
                <stop class="stop1" offset="0%" />
                <stop class="stop2" offset="50%" />
                <stop class="stop3" offset="100%" />
            </linearGradient>
            <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="red" />
                <stop offset="50%" stop-color="black" stop-opacity="0" />
                <stop offset="100%" stop-color="blue" />
            </linearGradient>
            <linearGradient id="Gradient3" x1="0" x2="1" y1="0" y2="1" xlink:href="#Gradient1" />
        </defs>

        <rect id="rect1" x="10" y="10" rx="15" ry="15" width="100" height="100" />
        <rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#Gradient2)" />
        <rect x="10" y="230" rx="15" ry="15" width="100" height="100" fill="url(#Gradient3)" />
    </svg>
</template>

<style scoped>
#rect1 {
    fill: url(#Gradient1);
}
.stop1 {
    stop-color: red;
}
.stop2 {
    stop-color: black;
    stop-opacity: 0;
}
.stop3 {
    stop-color: blue;
}
</style>