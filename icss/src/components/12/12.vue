<template>
    <div class="demo1">
        <div>1</div>
        <div>&nbsp;</div>
        <div></div>
    </div>
</template>

<style scoped>
.demo1 div {
    height: 20px;
    background: blue;
    border: 1px solid red;
}
.demo1 div:empty {
    display: none;
}
</style>