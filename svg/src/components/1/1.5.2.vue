<template>
    <div></div>
    <svg>
        <defs>
            <!-- Filter declaration -->
            <filter id="MyFilter">
                <!-- offsetBlur -->
                <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
                <feOffset in="blur" dx="10" dy="10" result="offsetBlur" />

                <!-- merge SourceGraphic + offsetBlur -->
                <feMerge>
                    <feMergeNode in="offsetBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
    </svg>
</template>

<style scoped>
div {
    width: 200px;
    height: 200px;
    background: url("/favicon.ico");
    filter: url(#MyFilter);
}
</style>