<template>
    <div></div>

    <svg>
        <defs>
            <filter id="roughpaper">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.04"
                    numOctaves="5"
                    result="noise"
                />

                <feDiffuseLighting in="noise" lighting-color="#fff" surfaceScale="2">
                    <feDistantLight azimuth="45" elevation="60" />
                </feDiffuseLighting>
            </filter>
        </defs>
    </svg>
</template>

<style scoped>
div {
    width: 650px;
    height: 500px;
    filter: url(#roughpaper);
}
</style>