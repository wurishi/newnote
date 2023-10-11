居中单个元素
<page>
    <div class="container absolute">
        <div class="sub" />
    </div>
    <div class="container autobot">
        <div class="sub" />
    </div>
    <div class="container flex">
        <div class="sub" />
    </div>
    <div class="container grid">
        <div class="sub" />
    </div>
</page>

<style>
    page {
        display: flex;
        position: relative;
    }
    .container {
        width: 200px;
        height: 200px;
        background: grey;
        margin: 0 10px;
    }
    .sub {
        width: 100px;
        height: 100px;
        background: black;
    }

    .absolute {
        position: relative;
    }
    .absolute .sub {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .autobot {
        display: flex;
    }
    .autobot .sub {
        margin: auto;
    }

    .flex {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .grid {
        display: grid;
        place-content: center;
    }
</style>
