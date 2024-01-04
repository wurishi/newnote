<script lang="ts">
    import { getAssetsUrl } from "../../proxy";

    const imgs = `url("${getAssetsUrl("img.jpg")}"), url("${getAssetsUrl("galaxy.jpg")}")`;
</script>
<div class="container" style="color:red;background: {imgs};" />

<style>
    .container {
        width: 200px;
        height: 150px;
        background-size: cover;
        background-blend-mode: lighten;
    }
</style>
