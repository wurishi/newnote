<template>
    <p class="blur">Time to clean my glasses</p>
    <svg height="0" width="0">
        <defs>
            <filter id="wherearemyglasses" x="0" y="0">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
            </filter>
        </defs>
    </svg>
</template>

<style scoped>
.blur {
    filter: url(#wherearemyglasses);
}
</style>