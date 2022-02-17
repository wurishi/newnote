<template>
    <svg width="200" height="200">
        <text x="15" y="30" fill="black" font-size="12pt">
            Hello
            <tspan font-weight="bold" fill="red">World!</tspan>
        </text>

        <defs>
            <path id="my_path" d="M20 20 C40 40 80 40 100 20" />
            <text id="example">ref</text>
        </defs>

        <text transform="translate(0 30)" font-size="8">
            <textPath xlink:href="#my_path">This text follows a curve.</textPath>
        </text>

        <text x="15" y="100" fill="yellow">
            <tref xlink:href="#example" />
        </text>
    </svg>
</template>