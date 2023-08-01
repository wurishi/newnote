<script lang="ts">
    import { getAssetsUrl } from "../../proxy";

    const img = getAssetsUrl("img.jpg");
</script>

使用 mask 实现图片切角遮罩

<div class="notching" style={`background: url(${img})`} />

<style>
    .notching {
        width: 200px;
        height: 150px;
        -webkit-mask: linear-gradient(135deg, transparent 15px, #fff 0) top left,
            linear-gradient(-135deg, transparent 15px, #fff 0) top right,
            linear-gradient(-45deg, transparent 15px, #fff 0) bottom right,
            linear-gradient(45deg, transparent 15px, #fff 0) bottom left;
        -webkit-mask-size: 50% 50%;
        -webkit-mask-repeat: no-repeat;
    }
</style>
