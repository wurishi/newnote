<div class="father">
    <div class="children">Click</div>
</div>

<div class="father">
    <div class="children" tabindex="-1">Click (has tabindex)</div>
</div>

<style>
    .father {
        padding: 20px;
        background-color: yellow;
    }
    .children {
        border: 1px solid black;
        text-align: center;
    }

    .father:focus-within {
        background: #fc0;
    }
</style>
