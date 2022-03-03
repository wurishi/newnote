<template>
    <div class="container">
        <div class="inline-block">#divA display: inline-block</div>
        <div class="float">#divB float: left</div>
    </div>
    <div class="container opacity">
        <div class="inline-block">#divA display: inline-block</div>
        <div class="float">#divB float: left</div>
    </div>
</template>

<style scoped>
.container {
    position: relative;
    background: #ddd;
    width: 300px;
}
.container > div {
    width: 200px;
    height: 200px;
}

.float {
    float: left;
    background-color: deeppink;
}

.inline-block {
    display: inline-block;
    background-color: yellowgreen;
    margin-left: -100px;
}

.opacity > div {
    opacity: 0.9;
}
</style>