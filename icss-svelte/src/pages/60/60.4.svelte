`border-image` + `overflow: hidden`

<div class="border-image-overflow" />

<style>
    .border-image-overflow {
        position: relative;
        width: 200px;
        height: 100px;
        border-radius: 10px;
        overflow: hidden;
    }

    .border-image-overflow::before {
        content: "";
        position: absolute;
        box-sizing: border-box;
        width: 200px;
        height: 100px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 10px solid;
        border-image: linear-gradient(45deg, gold, deeppink) 1;
    }
</style>
