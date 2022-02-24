<template>
    <div class="arrow-button"></div>

    <svg width="0" height="0">
        <filter id="outline">
            <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="1" />

            <feFlood flood-color="green" flood-opacity="1" in="DILATED" result="flood" />
            <feComposite in="flood" in2="DILATED" operator="in" result="OUTLINE" />

            <feMerge>
                <feMergeNode in="OUTLINE" />
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