<template>
    <div>Coco</div>
    <div class="turbulence">Coco</div>

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
                    baseFrequency="0.03"
                    numOctaves="1"
                    result="tur"
                />
                <feDisplacementMap in="SourceGraphic" in2="tur" scale="50" />
            </filter>
        </defs>
    </svg>
</template>

<style scoped>
div {
    font-size: 64px;
}
.turbulence {
    filter: url(#fractal);
}
</style>