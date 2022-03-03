<template>
    <div class="test"></div>
    <div class="background-border"></div>
    <div class="background-border-2"></div>
</template>

<style scoped>
.test {
    width: 200px;
    height: 150px;
    background-color: red;
    border: 20px dashed blue;
    background-image: url("/img.jpg");
    background-repeat: no-repeat;
}

div {
    position: relative;
    width: 180px;
    height: 180px;
}

.background-border {
    background: #9c27b0;
    border: 20px dashed #2196f3;
}
.background-border::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: white;
}

.background-border-2 {
    background: #fff;
    background-clip: padding-box;
    border: 20px dashed #cccc99;
}
.background-border-2::before {
    content: "";
    position: absolute;
    top: -20px;
    left: -20px;
    bottom: -20px;
    right: -20px;
    background: #996699;
    z-index: -1;
}
</style>