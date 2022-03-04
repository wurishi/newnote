<template>
    <div class="container demo1">
        <i v-for="i in 5" :key="i">{{ i }}</i>
    </div>
    <div class="container demo2">
        <div class="justify">
            <template v-for="i in 5" :key="i">
                <i>{{ i }}</i>&nbsp;
            </template>
        </div>
    </div>
    <div class="container demo3">
        <div class="justify2">
            <template v-for="i in 5" :key="i">
                <i>{{ i }}</i>&nbsp;
            </template>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    background: grey;
    border: 1px solid black;
}
.container i {
    width: 24px;
    line-height: 24px;
    display: inline-block;
    text-align: center;
    border-radius: 50%;
    background-color: black;
    color: white;
}
.demo1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.justify {
    text-align: justify;
    text-align-last: justify;
}

.justify2 {
    text-align: justify;
}
.justify2::after {
    content: "";
    display: inline-block;
    position: relative;
    width: 100%;
}
</style>