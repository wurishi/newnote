hover 增亮图片

<script lang="ts">
    import { getAssetsUrl } from "../../proxy";

    const src = getAssetsUrl('img.jpg')
</script>

<div class="btn">button</div>
<img class="img" {src} />

<style>
    .btn {
        width: 150px;
        background-color: yellowgreen;
        border: 1px solid yellowgreen;
        color: white;
        text-align: center;
    }

    .btn:hover, .img:hover {
        transition: filter .3s;
        filter: brightness(1.1) contrast(110%);
    }
</style>