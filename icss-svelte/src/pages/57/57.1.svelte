<h2>普通：</h2>
<div class="box1">
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>
</div>

<h2>scroll-snap-type:</h2>
<div class="box2">
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
    </ul>
</div>

<style>
    ul {
        display: flex;
        overflow: auto;
        width: 200px;
    }

    li {
        display: block;
        width: 200px;
        height: 100px;
        flex-shrink: 0;
    }

    li:nth-child(1) {
        background-color: red;
    }
    li:nth-child(2) {
        background-color: green;
    }
    li:nth-child(3) {
        background-color: blue;
    }

    .box2 ul {
        scroll-snap-type: x mandatory;
    }
    .box2 ul li {
        scroll-snap-align: center;
    }
</style>
