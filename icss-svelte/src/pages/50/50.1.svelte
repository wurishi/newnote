50.1 自动 margin 实现 `space-around` 和 `space-between`

<div class="flex1">
    <li>liA</li>
    <li>liB</li>
    <li>liC</li>
    <li>liD</li>
    <li>liE</li>
</div>

<div class="flex2">
    <li>liA</li>
    <li>liB</li>
    <li>liC</li>
    <li>liD</li>
    <li>liE</li>
</div>

<style>
    li {
        list-style: none;
        display: inline-block;
        background-color: aqua;
        border: 1px solid black;
        min-width: 200px;
    }

    .flex1 {
        display: flex;
        /* justify-content: space-around; */
    }
    .flex1 li {
        margin: auto;
    }

    .flex2 {
        display: flex;
        /* justify-content: space-between; */
    }
    .flex2 li {
        margin: auto;
    }
    .flex2 li:first-child {
        margin-left: 0;
    }
    .flex2 li:last-child {
        margin-right: 0;
    }
</style>
