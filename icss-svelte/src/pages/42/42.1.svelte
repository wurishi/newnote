<script lang="ts">
    import { getAssetsUrl } from "../../proxy";

    const img = getAssetsUrl("img.jpg");

    const list = new Array(10).fill(0);
</script>

background-attachment: scroll
<div class="g g-scroll" style={`background-image:url("${img}")`}>
    {#each list as item, idx}
        <p>{idx + 1}</p>
    {/each}
</div>

background-attachment: local
<div class="g g-local" style={`background-image:url("${img}")`}>
    {#each list as _, idx}
        <p>{idx + 1}</p>
    {/each}
</div>

background-attachment: fixed
<div class="g g-fixed" style={`background-image:url("${img}")`}>
    {#each list as _, idx}
        <p>{idx + 1}</p>
    {/each}
</div>

<style>
    .g {
        width: 200px;
        height: 100px;
        color: white;
        overflow-y: auto;
        margin: 0 auto;
    }

    .g p {
        display: block;
        text-align: center;
        font-size: 20px;
    }

    .g-scroll {
        background-attachment: scroll;
    }

    .g-local {
        background-attachment: local;
    }

    .g-fixed {
        background-attachment: fixed;
    }

    ::-webkit-scrollbar {
        width: 10px;
        background-color: #aaa;
    }

    ::-webkit-scrollbar-thumb {
        background: white;
    }
</style>
