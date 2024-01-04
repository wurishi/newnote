<div class="container">
    <div class="other">
        <p>1111111</p>
        <p>1111111</p>
        <p>1111111</p>
        <p>1111111</p>
        <p>1111111</p>
        <div class="hidden">
            <div class="sticky">
                <p>2222222</p>
                <p>2222222</p>
                <p>2222222</p>
                <p>2222222</p>
            </div>
        </div>
        <p>1111111</p>
        <p>1111111</p>
        <p>1111111</p>
        <p>1111111</p>
        <p>1111111</p>
        <p>1111111</p>
        <p>1111111</p>
        <p>1111111</p>
        <p>1111111</p>
        <p>1111111</p>
        <p>1111111</p>
        <p>1111111</p>
        <p>1111111</p>
        <p>1111111</p>
    </div>
</div>

<style>
    .container {
        position: relative;
        width: 300px;
        height: 100vh;
        margin: auto;
        border: 1px solid #333;
        overflow: scroll;
        line-height: 42px;
    }

    .sticky {
        background: deeppink;
        position: sticky;
        top: 0;
    }

    .hidden {
        height: 100vh;
        background: yellowgreen;
        overflow: hidden;
    }
</style>
