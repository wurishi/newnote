<page>
    <div style="box-shadow:0 0 0 200px #b5e0ba,0 0 0 400px #5d3a3a" />
</page>
<page>
    <div style="box-shadow:0+0+0+200px#b5e0ba,0+0+0+5in#5d3a3a" />
</page>

<div class="conic" />
<div class="conic30" />

<div class="flex">
    <div class="box" />
</div>

<div class="grid">
    <div class="box" />
</div>

<style>
    page {
        display: flex;
        position: relative;
        width: 100vw;
        height: 400px;
    }

    .conic {
        width: 100vw;
        height: 400px;
        background: repeating-conic-gradient(#fff, #000, #fff 0.1deg);
    }

    .conic30 {
        width: 100vw;
        height: 400px;
        background: repeating-conic-gradient(#fff, #000, #fff 30deg);
    }

    .flex {
        display: flex;
        background-color: yellow;
        width: 100vw;
        height: 400px;
        border: 1px solid black;
    }

    .box {
        width: 300px;
        height: 300px;
        background-color: black;
    }

    .flex .box {
        margin: auto;
    }

    .grid {
        display: grid;
        background-color: yellow;
        width: 100vw;
        height: 400px;
        place-items: center;
        border: 1px solid black;
    }
</style>
