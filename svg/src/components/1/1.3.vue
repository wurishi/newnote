<template>
    <svg style="background-color:black;">
        <defs>
            <clipPath id="cut-off-bottom">
                <rect x="0" y="0" width="200" height="100" />
                <rect x="0" y="100" width="20" height="20" />
                <rect x="20" y="100" width="20" height="20" />
            </clipPath>
        </defs>

        <circle
            cx="100"
            cy="100"
            r="100"
            fill="rgba(255,255,0,0.5)"
            clip-path="url(#cut-off-bottom)"
        />
    </svg>

    <svg width="200" height="200">
        <defs>
            <linearGradient id="gradient">
                <stop offset="0" stop-color="white" stop-opacity="0" />
                <stop offset="1" stop-color="white" stop-opacity="1" />
            </linearGradient>
            <mask id="mask">
                <rect x="0" y="0" width="200" height="200" fill="url(#gradient)" />
            </mask>
        </defs>

        <rect x="0" y="0" width="200" height="200" fill="green" />
        <rect x="0" y="0" width="200" height="200" fill="red" mask="url(#mask)" />
    </svg>

    <br />

    <svg>
        <rect x="0" y="0" width="100" height="100" opacity=".5" />
    </svg>

    <br />

    <svg
        width="200"
        height="200"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
    >
        <rect x="0" y="0" width="200" height="200" fill="blue" />
        <circle
            cx="100"
            cy="100"
            r="50"
            stroke="yellow"
            stroke-width="40"
            stroke-opacity="0.5"
            fill="red"
        />
    </svg>
</template>