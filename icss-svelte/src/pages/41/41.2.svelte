:focus-within 的冒泡性
<div class="g-father">
    <div class="g-children">
        <input type="button" value="Button" />
    </div>
</div>

<style>
    input:focus {
        background-color: #00bcd4;
    }

    .g-father {
        padding: 20px;
    }

    .g-father:focus-within {
        background-color: #ffeb3b;
    }

    .g-children {
        padding: 20px;
    }

    .g-children:focus-within {
        background-color: #4caf50;
    }
</style>
