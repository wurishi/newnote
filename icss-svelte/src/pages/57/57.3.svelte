`scroll-margin` / `scroll-padding`

<div class="box">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>10</div>
    <div>11</div>
    <div>12</div>
    <div>13</div>
</div>

<style>
    .box {
        display: flex;
        width: 600px;
        flex-direction: row;
        flex-wrap: wrap;
        height: 500px;
        overflow: auto;
        scroll-snap-type: y mandatory;
        scroll-padding-top: 30px;
        border: 1px solid black;
    }

    .box div {
        width: 150px;
        margin: 15px 5px;
        height: 200px;
        text-align: center;
        background-color: cyan;
        line-height: 200px;
        scroll-snap-align: start;
    }
</style>
