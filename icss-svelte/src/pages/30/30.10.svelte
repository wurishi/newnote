<script lang="ts">
    let showPath = false;
</script>

心形，菱形
<label for="path">显示path</label>
<input type="checkbox" name="path" bind:checked={showPath} />
<div class="text-section">
    <div class="wrap-before {showPath && 'show'}" />
    <div class="wrap-after {showPath && 'show'}" />
    <h1>Hello CSSshapes</h1>
    <p>
        The shape-outside CSS property uses shape values to define the float
        area for a float and will cause inline content to wrap around the shape
        instead of the float's bounding box. For interpolating between one basic
        shape and a se For
    </p>
</div>

<style>
    .text-section {
        width: 400px;
        height: 400px;
        margin: 0 auto;
    }

    p,
    h1 {
        font-family: "lucida grande", "lucida sans unicode", lucida, helvetica,
            "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei",
            sans-serif;
        text-align: justify;
    }

    .wrap-before {
        shape-outside: polygon(0 0, 0 100%, 100% 100%, 0 50%, 100% 0);
        float: left;
        width: 50%;
        height: 100%;
    }
    .wrap-before.show {
        clip-path: polygon(0 0, 0 100%, 100% 100%, 0 50%, 100% 0);
        background-color: aqua;
    }

    .wrap-after {
        shape-outside: polygon(100% 0, 100% 100%, 0% 100%, 100% 50%, 0% 0);
        float: right;
        width: 50%;
        height: 100%;
    }
    .wrap-after.show {
        clip-path: polygon(100% 0, 100% 100%, 0% 100%, 100% 50%, 0% 0);
        background-color: aqua;
    }
</style>
