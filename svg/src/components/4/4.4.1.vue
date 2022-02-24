<template>
    <div class="g-text">
        <p>Normal Text</p>
        <p class="dilate">Normal Text</p>
        <p class="erode">Normal Text</p>
    </div>

    <svg width="0" height="0">
        <filter id="dilate">
            <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="3" />
        </filter>
        <filter id="erode">
            <feMorphology in="SourceAlpha" result="ERODE" operator="erode" radius="1" />
        </filter>
    </svg>
</template>

<style scoped>
p {
    font-size: 64px;
}
.dilate {
    filter: url(#dilate);
}
.erode {
    filter: url(#erode);
}
</style>