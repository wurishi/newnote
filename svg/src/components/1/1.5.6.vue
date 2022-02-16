<template>
    <div></div>
    <div class="svg-filter"></div>

    <svg>
        <defs>
            <filter id="filter">
                <!-- Lighting effect -->
                <feSpecularLighting
                    in="SourceGraphic"
                    specularExpoinent="20"
                    specularConstant="0.75"
                    result="spec"
                >
                    <fePointLight x="0" y="0" z="200" />
                </feSpecularLighting>
                <!-- Composition of inputs -->
                <feComposite
                    in="SourceGraphic"
                    in2="spec"
                    operator="arithmetic"
                    k1="0"
                    k2="1"
                    k3="1"
                    k4="0"
                />
            </filter>
        </defs>
    </svg>
</template>

<style scoped>
div {
    background: url("/image1.jpg");
    width: 200px;
    height: 150px;
}
.svg-filter {
    filter: url(#filter);
}
</style>