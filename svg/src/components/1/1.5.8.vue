<template>
    <svg width="200" height="150" viewBox="0 0 200 150">
        <defs>
            <filter id="morphology">
                <feMorphology operator="erode" radius="0">
                    <animate
                        attributeName="radius"
                        from="0"
                        to="5"
                        dur="5s"
                        repeatCount="indefinite"
                    />
                </feMorphology>
            </filter>
        </defs>
        <image
            xlink:href="/image1.jpg"
            width="90%"
            height="90%"
            x="10"
            y="10"
            filter="url(#morphology)"
        />
    </svg>
    <svg width="200" height="150" viewBox="0 0 200 150">
        <defs>
            <filter id="morphology1">
                <feMorphology operator="dilate" radius="0">
                    <animate
                        attributeName="radius"
                        from="0"
                        to="5"
                        dur="5s"
                        repeatCount="indefinite"
                    />
                </feMorphology>
            </filter>
        </defs>
        <image
            xlink:href="/image1.jpg"
            width="90%"
            height="90%"
            x="10"
            y="10"
            filter="url(#morphology1)"
        />
    </svg>
</template>