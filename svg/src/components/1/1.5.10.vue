<template>
    <div>Hello</div>
    <div class="turbulence">Hello</div>

    <svg>
        <defs>
            <filter id="fractal">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.03"
                    numOctaves="1"
                    result="turbu"
                >
                    <animate
                        attributeName="baseFrequency"
                        from="0.03"
                        to="0.2"
                        dur="50s"
                        repeatCount="indefinite"
                    />
                    <!-- <animate
                        attributeName="numOctaves"
                        from="1"
                        to="4"
                        dur="5s"
                        repeatCount="indefinite"
                    />-->
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="turbu" scale="50">
                    <!-- <animate
                        attributeName="scale"
                        from="50"
                        to="100"
                        dur="10s"
                        repeatCount="indefinite"
                    />-->
                </feDisplacementMap>
            </filter>
        </defs>
    </svg>
</template>

<style scoped>
div {
    font-size: 64px;
    background: url("/image1.jpg") no-repeat;
}
.turbulence {
    filter: url(#fractal);
}
</style>