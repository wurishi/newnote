<template>
    <div class="container">
        <div class="reflect"></div>
        <div class="inherit"></div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
}

.container > div {
    background-image: url("/img.jpg");
    width: 200px;
    height: 150px;
}

.reflect {
    -webkit-box-reflect: below;
}

.inherit {
    position: relative;
}
.inherit::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    bottom: -100%;
    background-image: inherit;
    transform: rotateX(180deg);
}
</style>