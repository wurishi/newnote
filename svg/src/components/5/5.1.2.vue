<template>
    <div></div>

    <svg>
        <defs>
            <filter
                id="fractal"
                filterUnits="objectBoundingBox"
                x="0"
                y="0"
                width="100%"
                height="100%"
            >
                <feTurbulence
                    id="turbulence"
                    type="fractalNoise"
                    baseFrequency="0.09"
                    numOctaves="1"
                />
                <feDisplacementMap in="SourceGraphic" scale="15" />
            </filter>
        </defs>
    </svg>
</template>

<style scoped>
div {
    background: url("/image1.jpg");
    filter: url(#fractal);
    width: 200px;
    height: 150px;
}
</style>