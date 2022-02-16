<template>
    <svg width="220" height="220">
        <defs>
            <radialGradient
                id="GradientPad"
                cx="0.5"
                cy="0.5"
                r="0.4"
                fx="0.75"
                fy="0.75"
                spreadMethod="pad"
            >
                <stop offset="0" stop-color="red" />
                <stop offset="1" stop-color="blue" />
            </radialGradient>
            <radialGradient id="GradientRepeat" spreadMethod="repeat" xlink:href="#GradientPad" />
            <radialGradient id="GradientReflect" spreadMethod="reflect" xlink:href="#GradientPad" />
        </defs>

        <rect x="10" y="10" rx="15" ry="15" width="100" height="100" fill="url(#GradientPad)" />
        <text x="15" y="30" fill="white" font-size="12pt">Pad</text>

        <rect x="10" y="120" rx="15" ry="15" width="100" height="100" fill="url(#GradientRepeat)" />
        <text x="15" y="140" fill="white" font-size="12pt">Repeat</text>

        <rect x="120" y="120" rx="15" ry="15" width="100" height="100" fill="url(#GradientReflect)" />
        <text x="125" y="140" fill="white" font-size="12pt">Reflect</text>
    </svg>
</template>