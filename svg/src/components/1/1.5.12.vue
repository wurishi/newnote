<template>
    <div class="fe1">Button</div>
    <div class="fe2">Button</div>

    <svg>
        <defs>
            <filter id="fe1">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.00001 9.99999"
                    numOctaves="1"
                    result="wrap"
                >
                    <animate
                        attributeName="baseFrequency"
                        from="0.00001 9.99999"
                        to="0.00001 0.001"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                </feTurbulence>
                <feOffset dx="-90" dy="-90" result="wrapOffset" />
                <feDisplacementMap
                    xChannelSelector="R"
                    yChannelSelector="G"
                    scale="30"
                    in="SourceGraphic"
                    in2="warp"
                />
            </filter>
            <filter id="fe2">
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="9.99999 0.00001"
                    numOctaves="1"
                    result="wrap"
                >
                    <animate
                        attributeName="baseFrequency"
                        from="9.99999 0.00001"
                        to="0.001 0.00001"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                </feTurbulence>
                <feOffset dx="-90" dy="-90" result="wrapOffset" />
                <feDisplacementMap
                    xChannelSelector="R"
                    yChannelSelector="G"
                    scale="30"
                    in="SourceGraphic"
                    in2="warp"
                />
            </filter>
        </defs>
    </svg>
</template>

<style scoped>
div {
    width: 200px;
    height: 64px;
    outline: 200px solid transparent;
    background-color: chocolate;
    /* border: 1px solid red; */
    text-align: center;
    line-height: 64px;
}
.fe1:hover {
    filter: url(#fe1);
}
.fe2:hover {
    filter: url(#fe2);
}
</style>