<template>
    <div></div>
    <div class="fractal"></div>

    <svg width="200" height="200" viewBox="0 0 200 150">
        <defs>
            <filter id="fractal" filterUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.995"
                    numOctaves="10"
                    seed="1"
                    stitchTiles="noStitch"
                />
                <feDisplacementMap
                    in="SourceGraphic"
                    xChannelSelector="R"
                    yChannelSelector="G"
                    scale="600"
                >
                    <animate
                        attributeName="scale"
                        values="600;0;0"
                        keyTimes="0;0.75;1"
                        begin="0s"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                </feDisplacementMap>
            </filter>
        </defs>
    </svg>
</template>

<style scoped>
div {
    width: 200px;
    height: 150px;
    background: url("/image1.jpg");
}
.fractal {
    filter: url(#fractal);
}
</style>