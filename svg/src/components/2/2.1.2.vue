<script lang="ts" setup>
import { ref } from 'vue';

const mapList = [
    'grad2.jpeg',
    'grad4.jpeg',
    'grad5.jpeg',
    'grad6.jpeg',
    'grad7.jpeg',
    'grad8.png',
    'grad9.jpeg',
    'grad10.jpeg',
    'map.png',
    'ripple-gray.png',
    'grad12.jpeg',
    'grad1.jpeg'
]

const filterSrc = ref('/' + mapList[0])

const scale = ref(80)

const changeFilterSrc = (src: string) => {
    filterSrc.value = '/' + src
}
</script>

<template>
    <span>Map: {{ filterSrc }}</span>
    <svg>
        <defs>
            <filter id="filter-ripple">
                <feImage
                    :xlink:href="filterSrc"
                    x="0"
                    y="0"
                    width="512"
                    height="512"
                    result="ripple"
                />
                <feDisplacementMap
                    xChannelSelector="R"
                    yChannelSelector="G"
                    color-interpolation-filters="sRGB"
                    in="SourceGraphic"
                    in2="ripple"
                    :scale="scale"
                />
                <feComposite operator="in" in2="ripple" />
            </filter>
        </defs>
    </svg>
    <img src="/mm1.jpg" class="target" />
    <span>Scale: {{ scale }}</span>
    <input type="range" v-model="scale" min="0" max="200" />
    <ul>
        <li v-for="img of mapList" :key="img" @click="changeFilterSrc(img)">
            <img :class="filterSrc.includes(img) && 'selected'" :src="'/' + img" />
        </li>
    </ul>
</template>

<style scoped>
ul li {
    display: inline;
}
ul li img {
    width: 120px;
    height: 120px;
}

ul li img.selected {
    border: 1px solid red;
}

.target {
    width: 512px;
    height: 381px;
    filter: url(#filter-ripple);
}
</style>