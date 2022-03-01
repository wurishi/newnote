<template>
    <div></div>
    <div class="border">border</div>
    <div class="cls-2">伪元素</div>
    <div class="box-shadow">box-shadow</div>
    <div class="inset-box-shadow">内 box-shadow</div>
    <div class="drop-shadow">drop-shadow</div>
    <div class="linear-gradient">linear-gradient</div>
    <div class="outline">outline</div>
    <div class="scrollbar"></div>
    <div class="text-decoration">text-decoration</div>
    <div class="first-letter">1</div>
    <div class="list-style"></div>
</template>

<style scoped>
div {
    position: relative;
    width: 200px;
    height: 60px;
    background: #ddd;
    margin: 20px;
}

.border {
    border-left: 5px solid deeppink;
}

.cls-2::before {
    content: "";
    width: 5px;
    height: 60px;
    position: absolute;
    top: 0;
    left: 0;
    background: deeppink;
}

.box-shadow {
    box-shadow: -5px 0px 0 0 deeppink;
}

.inset-box-shadow {
    box-shadow: inset 5px 0 0 0 deeppink;
}

.drop-shadow {
    filter: drop-shadow(-5px 0 0 deeppink);
}

.linear-gradient {
    background-image: linear-gradient(
        90deg,
        deeppink 0px,
        deeppink 5px,
        transparent 5px
    );
}

.outline {
    margin-left: 25px;
    height: 50px;
    outline: 5px solid deeppink;
}
.outline::after {
    position: absolute;
    content: "outline";
    top: -5px;
    bottom: -5px;
    left: 0;
    right: -5px;
    background: #ddd;
}

.scrollbar {
    width: 205px;
    background: deeppink;
    overflow-y: scroll;
}
.scrollbar::-webkit-scrollbar {
    width: 200px;
    background-color: #ddd;
}

.text-decoration {
    overflow: hidden;
}
.text-decoration::before {
    position: absolute;
    content: "____";
    font-size: 40px;
    color: #000;
    bottom: 0;
    text-decoration: underline;
    color: deeppink;
    line-height: 60px;
    transform: rotate(90deg);
    right: 142px;
}

.first-letter {
    position: relative;
    overflow: hidden;
}
.first-letter::first-letter {
    background: deeppink;
    color: transparent;
    width: 5px;
    position: absolute;
    left: 0;
    top: 0;
    padding: 34px 0;
    margin-left: -196px;
}

.list-style {
    display: list-item;
    list-style-type: square;
    list-style-position: inside;
    font-size: 600px;
    padding-left: 5px;
    background: deeppink;
    color: #ddd;
    line-height: 0;
    overflow: hidden;
}
</style>