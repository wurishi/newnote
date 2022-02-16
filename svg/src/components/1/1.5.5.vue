<script lang="ts" setup>
import { ref } from 'vue'
const colorMatrix = ref([[1, 0, 0, 0, 0], [0, 1, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 0]])

const list1 = ['Red', 'Green', 'Blue', 'Alpha']
const list2 = list1.concat('Add')

</script>

<template>
    <div class="matrix"></div>
    <div
        v-for="(channel, i) of list1"
        :key="'channel_' + channel"
        style="border-bottom: 1px solid grey;"
    >
        <template v-for="(it, j) of list2" :key="channel+'_'+it">
            <span
                style="display: inline-block; width: 150px; "
            >{{ it }} to {{ channel }}: {{ colorMatrix[i][j] }}</span>
            <input type="range" min="-2" max="2" step="0.01" v-model="colorMatrix[i][j]" />
        </template>
    </div>
    <svg>
        <defs>
            <filter id="colorMatrix">
                <feColorMatrix
                    in="SourceGraphic"
                    type="matrix"
                    :values="colorMatrix.map(it => it.join(' ')).join(',')"
                />
            </filter>
        </defs>
    </svg>
</template>

<style scoped>
div {
    text-align: left;
}
.matrix {
    width: 200px;
    height: 150px;
    background: url("/image1.jpg");
    filter: url(#colorMatrix);
}
</style>