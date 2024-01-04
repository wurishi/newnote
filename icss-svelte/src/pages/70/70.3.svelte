控制间距
<page>
    <div class="container absolute">
        <div class="sub">1</div>
        <div class="sub">123</div>
        <div class="sub">123456</div>
    </div>
    <div class="container autobot">
        <div class="sub">1</div>
        <div class="sub">123</div>
        <div class="sub">123456</div>
    </div>
    <div class="container flex">
        <div class="sub">1</div>
        <div class="sub">123</div>
        <div class="sub">123456</div>
    </div>
    <div class="container grid">
        <div class="sub">1</div>
        <div class="sub">123</div>
        <div class="sub">123456</div>
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
        gap: 5px;
    }
    .sub {
        border: 1px solid deeppink;
        padding: 10px;
        border-radius: 5px;
        background: black;
        color: white;
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