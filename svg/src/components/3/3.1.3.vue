<template>
    <p class="target" style="background: lime;">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam.
    </p>
    <pre class="target">lorem</pre>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing
        <b class="target">
            elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
        </b>
        Ut enim ad minim veniam.
    </p>

    <svg width="0" height="0">
        <defs>
            <filter id="f1">
                <feGaussianBlur stdDeviation="3" />
            </filter>
            <filter id="f2">
                <feColorMatrix
                    values="
                    0.3333 0.3333 0.3333 0 0
                    0.3333 0.3333 0.3333 0 0
                    0.3333 0.3333 0.3333 0 0
                    0      0      0      1 0"
                />
            </filter>
            <filter id="f3">
                <feConvolveMatrix
                    filterRes="100 100"
                    style="color-interpolation-filters:sRGB"
                    order="3"
                    kernelMatrix="0 -1 0 -1 4 -1 0 -1 0"
                    preserveAlpha="true"
                />
            </filter>
            <filter id="f4">
                <feSpecularLighting
                    surfaceScale="5"
                    specularConstant="1"
                    specularExpoinent="10"
                    lighting-color="white"
                >
                    <fePointLight x="-5000" y="-10000" z="20000" />
                </feSpecularLighting>
            </filter>
            <filter id="f5">
                <feColorMatrix
                    values="
                    1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 1 0 0 0"
                    color-interpolation-filters="sRGB"
                />
            </filter>
        </defs>
    </svg>
</template>

<style scoped>
p {
    width: 300px;
    border: 1px solid #000;
    display: inline-block;
}
p.target {
    filter: url(#f3);
}
p.target:hover {
    filter: url(#f5);
}
b.target {
    filter: url(#f1);
}
b.target:hover {
    filter: url(#f4);
}
pre.target {
    filter: url(#f2);
}
pre.target:hover {
    filter: url(#f3);
}
</style>