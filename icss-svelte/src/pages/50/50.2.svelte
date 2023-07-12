自动 `margin` 实现 `align-self: center | flex-end`

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
        width: 100px;
        text-align: center;
        font-size: 18px;
        color: white;
        margin: auto;
    }

    li:nth-child(1) {
        height: 100px;
        background: #336699;
    }

    li:nth-child(2) {
        height: 120px;
        background: #669933;
    }

    li:nth-child(3) {
        height: 140px;
        background: #996633;
    }

    li:nth-child(4) {
        height: 160px;
        background: #229955;
    }

    li:nth-child(5) {
        height: 180px;
        background: #199652;
    }

    .flex1 {
        height: 200px;
        box-sizing: border-box;
        background-color: greenyellow;
        display: flex;
        border: 1px solid black;
    }

    .flex2 {
        height: 200px;
        box-sizing: border-box;
        background-color: greenyellow;
        display: flex;
        border: 1px solid black;
    }

    .flex2 li {
        margin: auto;
        margin-top: auto;
        margin-bottom: 0;
    }
</style>
