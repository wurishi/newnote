scroll-snap-align

<ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
    <li>7</li>
    <li>8</li>
    <li>9</li>
    <li>10</li>
</ul>

<style>
    ul {
        width: 300px;
        overflow-x: auto;
        display: flex;
        scroll-snap-type: x mandatory;
    }

    li {
        display: block;
        flex-shrink: 0;
        height: 100px;
        width: 200px;
        box-sizing: content-box;
        border: 1px solid black;
        scroll-snap-align: center;
        text-align: center;
    }

    li:nth-child(3) {
        width: 500px;
        background-color: red;
    }

    li:nth-child(4) {
        width: 100px;
        background-color: blue;
    }
</style>
