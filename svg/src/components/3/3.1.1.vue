<script lang="ts" setup>

</script>
<template>
    <svg width="0" height="0">
        <defs>
            <mask id="mask-1">
                <linearGradient id="gradient-1" y2="1">
                    <stop offset="0" stop-color="white" />
                    <stop offset="1" stop-opacity="0" />
                </linearGradient>
                <circle cx="0.25" cy="0.25" r="0.25" id="circle" fill="white" />
                <rect x="0.5" y="0.2" width="300" height="100" fill="url(#gradient-1)" />
            </mask>
        </defs>
        <!-- <rect width="500" height="500" mask="url(#mask-1)" /> -->
    </svg>
    mask 大部分浏览器仅有限支持 (-webkit-mask 效果类似于 clip-path)
    <p class="target" style="background: lime">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam.
    </p>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing
        <b class="target">
            elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua.
        </b>
        Ut enim ad minim veniam.
    </p>
</template>

<style scoped>
.target {
    /* mask: url(#mask-1); */
    -webkit-mask: url(#mask-1);
    /* mask-image: url(#mask-1); */
}
p {
    width: 300px;
    border: 1px solid #000;
    display: inline-block;
}
</style>