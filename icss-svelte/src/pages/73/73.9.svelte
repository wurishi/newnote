<script lang="ts">
    import { getAssetsUrl } from "../../proxy";
    const src1 = getAssetsUrl("hearts-border-image.png");
    const src2 = getAssetsUrl("skull-border.svg");
</script>

<div class="heart" style="--url: url({src1});" />
<div class="skulls" style="--url: url({src2});" />

<style>
    .heart {
        position: relative;
        width: 200px;
        height: 120px;
        margin: auto;
        border: 21px solid;
        border-image: var(--url) 21 round;
    }

    .skulls {
        position: relative;
        width: 600px;
        height: 200px;
        margin: auto;
        border: 24px solid;
        border-image: var(--url);
        border-image-slice: 32;
        border-image-repeat: round;
    }
</style>
