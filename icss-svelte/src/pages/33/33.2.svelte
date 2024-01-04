<script lang="ts">
    let addClass = 'g-empty';
    const options = [
        {key: 'none', value: 'g-empty'},
        {key: 'z-index 值不为 "auto"的 绝对/相对定位', value: 'g-absolute'},
        {key: '一个 z-index 值不为 "auto"的 flex 项目 (flex item)', value: 'g-flex'},
        {key: 'opacity 属性值小于 1 的元素', value: 'g-opacity'},
        {key: 'transform 属性值不为 "none"的元素', value: 'g-transform'},
        {key: 'mix-blend-mode 属性值不为 "normal"的元素', value: 'g-blend'},
        {key: 'filter值不为“none”的元素', value: 'g-filter'},
        {key: 'perspective值不为“none”的元素', value: 'g-perspective'},
        {key: 'isolation 属性被设置为 "isolate"的元素', value: 'g-isolation'},
        {key: 'position: fixed', value: 'g-fixed'},
        {key: '在 will-change 中指定了任意 CSS 属性', value: 'g-willChange'},
        {key: '-webkit-overflow-scrolling 属性被设置 "touch"的元素', value: 'g-scrolling'},
        {key: '设置了 transform-style: preserve-3d 的元素', value: 'g-preserve3d'},
        {key: '设置了 contain: paint | layout | content | strict 的元素', value: 'g-contain'},
        {key: '设置了 backdrop-filter 的元素', value: 'g-backdrop-filter'},
    ];
</script>

层叠上下文对 fixed 定位的影响（不同内核下表现可能不一致）
<br />
<select bind:value={addClass}>
    {#each options as opt}
        <option value={opt.value}>{opt.key}</option>
    {/each}
</select>

<div class="container {addClass}">
    <div class="fixed"></div>
</div>

<style>
    .container {
        width: 100px;
        height: 200px;
        background: rgba(255, 100, 100, .8);
    }

    .fixed {
        position: fixed;
        top: 80px;
        left: 0;
        right: 1vw;
        bottom: 1vw;
        background: rgba(100, 100, 255, .8);
        pointer-events: none;
    }

    .g-absolute {
        position: absolute;
        z-index: 10;
    }

    .g-flex {
        display: flex;
    }

    .g-opacity {
        opacity: .5;
    }

    .g-transform {
        transform: translate3d(0, 0, 0);
        /* transform: scale(1); */
    }

    .g-blend {
        mix-blend-mode: screen;
    }

    .g-filter {
        filter: blur(5px);
    }

    .g-perspective {
        perspective: 1000px;
    }

    .g-isolation {
        isolation: isolate;
    }

    .g-fixed {
        position: fixed;
    }

    .g-willChange {
        will-change: transform;
    }

    .g-scrolling {
        -webkit-overflow-scrolling: touch;
    }

    .g-backface {
        backface-visibility: hidden;
    }

    .g-preserve3d {
        transform-style: preserve-3d;
    }

    .g-contain {
        contain: paint;
    }

    .g-backdrop-filter {
        backdrop-filter: blur(5px);
    }

</style>