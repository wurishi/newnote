<script lang="ts">
    import { onMount } from "svelte";
    import {cssTest} from './cssTest';
    console.log(CSS.supports("display", "flex"));

    const useLinear = CSS.supports(
        "background",
        "linear-gradient(90deg, #888, #ccc)"
    );

    onMount(() => {
        const root = document.documentElement;
        if ("background" in root) {
            console.log("background");
        }

        const el = document.createElement('div');
        el.style.backgroundImage = "linear-gradient(90deg, #888, #ccc)";
        if (el.style.backgroundImage) {
            console.log("支持");
        } else {
            console.log("不支持");
        }

        console.log('b', cssTest('backgroundImage'));
        console.log('b', cssTest('backgroundImage', 'linear-gradient(90deg, #888, #ccc)'));
        console.log('b', cssTest('backgroundImage', 'linear-gradient1(90deg, #888, #ccc)'));
    });
</script>

<div />

<div>
    <p>多行文本abcdefg多行文本</p>
</div>

<h1>HHH</h1>

<div id="d" class:linear-gradient={useLinear}>SPAN</div>

<style>
    div {
        width: 100px;
        height: 200px;
        background: linear-gradient(90deg, red, yellow);
    }
    @supports not (background: linear-gradient(90deg, red, yellow)) {
        div {
            background: red;
        }
    }

    p {
        overflow: hidden;
        text-overflow: ellipsis;
    }
    @supports (display: -webkit-box) and (-webkit-line-clamp: 2) and
        (-webkit-box-orient: vertical) {
        p {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
    }

    @supports (background: -webkit-linear-gradient(0deg, yellow, red)) or
        (background: linear-gradient(90deg, yellow, red)) {
        h1 {
            background: -webkit-linear-gradient(0deg, yellow, red);
            background: linear-gradient(90deg, yellow, red);
        }
    }

    .linear-gradient {
        background: linear-gradient(90deg, #888, #ccc);
    }
</style>
