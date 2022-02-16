<template>
    <svg width="120" height="240">
        <defs>
            <radialGradient id="RadialGradient1">
                <stop offset="0" stop-color="red" />
                <stop offset="100%" stop-color="blue" />
            </radialGradient>
            <radialGradient
                id="RadialGradient2"
                cx="0.25"
                cy="0.25"
                r="0.25"
                xlink:href="#RadialGradient1"
            />
        </defs>

        <rect x="10" y="10" rx="15" ry="15" width="100" height="100" fill="url(#RadialGradient1)" />
        <rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#RadialGradient2)" />
    </svg>
</template>