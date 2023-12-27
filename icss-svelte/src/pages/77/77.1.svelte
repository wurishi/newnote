<script lang="ts">
    import { getAssetsUrl } from "../../proxy";

    const url = getAssetsUrl('img.jpg')
</script>

<div style={`background-image:url(${url});`}></div>
<div style={`background-image:url(${url});`} class="mask"></div>

<style>
    div {
        width: 200px;
        height: 150px;
        background-repeat: no-repeat;
        background-size: cover;
    }

    .mask {
        mask: linear-gradient(90deg, transparent, #000);
    }
</style>