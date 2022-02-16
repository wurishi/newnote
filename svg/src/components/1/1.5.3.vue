<template>
    <span>normal</span>
    <div class="normal"></div>
    <span>multiply</span>
    <div class="multiply"></div>
    <span>screen</span>
    <div class="screen"></div>
    <span>darken</span>
    <div class="darken"></div>
    <span>lighten</span>
    <div class="lighten"></div>

    <svg>
        <defs>
            <filter id="normal" x="0" y="0" width="200" height="200">
                <feImage width="200" height="200" xlink:href="/image1.jpg" result="img1" />
                <feImage width="200" height="200" xlink:href="/image2.jpg" result="img2" />
                <feBlend mode="normal" in="img1" in2="img2" />
            </filter>
            <filter id="multiply" x="0" y="0" width="200" height="200">
                <feImage width="200" height="200" xlink:href="/image1.jpg" result="img1" />
                <feImage width="200" height="200" xlink:href="/image2.jpg" result="img2" />
                <feBlend mode="multiply" in="img1" in2="img2" />
            </filter>
            <filter id="screen" x="0" y="0" width="200" height="200">
                <feImage width="200" height="200" xlink:href="/image1.jpg" result="img1" />
                <feImage width="200" height="200" xlink:href="/image2.jpg" result="img2" />
                <feBlend mode="screen" in="img1" in2="img2" />
            </filter>
            <filter id="darken" x="0" y="0" width="200" height="200">
                <feImage width="200" height="200" xlink:href="/image1.jpg" result="img1" />
                <feImage width="200" height="200" xlink:href="/image2.jpg" result="img2" />
                <feBlend mode="darken" in="img1" in2="img2" />
            </filter>
            <filter id="lighten" x="0" y="0" width="200" height="200">
                <feImage width="200" height="200" xlink:href="/image1.jpg" result="img1" />
                <feImage width="200" height="200" xlink:href="/image2.jpg" result="img2" />
                <feBlend mode="lighten" in="img1" in2="img2" />
            </filter>
        </defs>
    </svg>
</template>

<style scoped>
.normal {
    width: 200px;
    height: 200px;
    filter: url(#normal);
}
.multiply {
    width: 200px;
    height: 200px;
    filter: url(#multiply);
}
.screen {
    width: 200px;
    height: 200px;
    filter: url(#screen);
}
.darken {
    width: 200px;
    height: 200px;
    filter: url(#darken);
}
.lighten {
    width: 200px;
    height: 200px;
    filter: url(#lighten);
}
</style>