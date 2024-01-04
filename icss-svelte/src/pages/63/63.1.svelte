<script lang="ts">
    import { getAssetsUrl } from "../../proxy";

    const img = getAssetsUrl("w.webp");

    let flag = false;
</script>

渐变遮罩

<div>
    <label for="flag_1">开启遮罩</label>
    <input id="flag_1" type="checkbox" bind:checked={flag} />
</div>
<div class={`img ${flag ? "mask" : ""}`} style={`background: url(${img})`} />

<style>
    .img {
        width: 100px;
        height: 100px;
    }

    .mask {
        mask: linear-gradient(90deg, transparent, #000);
        -webkit-mask: linear-gradient(90deg, transparent, #000);
    }
</style>
