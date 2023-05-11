<script lang="ts">
    import { getAssetsUrl } from "../../proxy";

    const src = getAssetsUrl('img.jpg');
    const getCSS = () => `url("${src}")`;
</script>

图片任意颜色赋色

<div>
    <img {src} />
</div>

<div>
    <div class="pic" style={'background: ' + getCSS() + ', linear-gradient(#f00, #f00);'}></div>
</div>

<style>
    .pic {
        width: 200px;
        height: 150px;
        background-blend-mode: lighten;
        background-size: cover;
    }
</style>