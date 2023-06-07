<script lang="ts">
    import { getAssetsUrl } from "../../proxy";

    const img1 = getAssetsUrl("img.jpg");
    const img2 = getAssetsUrl("galaxy.jpg");
    const img3 = getAssetsUrl("img.jpg");

    let noWord = false;
</script>

<input id="noWord" type="checkbox" bind:checked={noWord} />
<label for="noWord">NoWord</label>
<div class="container">
    <section class="g-word" style={`display: ${noWord ? "none" : "block"}`}>
        Header
    </section>
    <section class="g-img1" style={`background-image:url("${img1}")`}>
        IMG1
    </section>
    <section class="g-word" style={`display: ${noWord ? "none" : "block"}`}>
        Content1
    </section>
    <section class="g-img2" style={`background-image:url("${img2}")`}>
        IMG2
    </section>
    <section class="g-word" style={`display: ${noWord ? "none" : "block"}`}>
        Content2
    </section>
    <section class="g-img3" style={`background-image:url("${img3}")`}>
        IMG3
    </section>
    <section class="g-word" style={`display: ${noWord ? "none" : "block"}`}>
        Footer
    </section>
</div>

<style>
    .container {
        height: 200px;
        overflow-y: auto;
    }
    section {
        height: 200px;
        background-color: rgba(0, 0, 0, 0.7);
        color: white;
        line-height: 200px;
        text-align: center;
        font-size: 20px;
    }

    .g-img1,
    .g-img2,
    .g-img3 {
        background-attachment: fixed;
        /* background-size: cover; */
        background-position: center center;
    }
</style>
