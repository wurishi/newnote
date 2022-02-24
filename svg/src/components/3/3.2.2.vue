<template>
    <svg width="300" height="100">
        <rect x="0" y="0" width="300" height="100" stroke="black" stroke-width="1" />
        <rect x="0" y="50" width="15" height="34" fill="blue" stroke="black" stroke-width="1">
            <animateTransform
                attributeName="transform"
                begin="0s"
                dur="20s"
                type="rotate"
                from="0 60 60"
                to="360 100 60"
                repeatCount="indefinite"
            />
        </rect>
    </svg>
</template>