<template>
    <div class="arrow-button"></div>

    <svg width="0" height="0">
        <filter id="outline">
            <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="1" />
            <feMerge>
                <feMergeNode in="DILATED" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
    </svg>
</template>

<style scoped>
@import url("./arrow-button.css");

.arrow-button {
    filter: url(#outline);
}
</style>