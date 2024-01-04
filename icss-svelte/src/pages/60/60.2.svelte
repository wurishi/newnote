`background-image` + 伪元素

<div class="background-image" />

<style>
    .background-image {
        color: red;
        position: relative;
        width: 200px;
        height: 100px;
    }

    .background-image::after {
        position: absolute;
        content: "";
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        background-color: white;
        top: 10px;
        left: 10px;
        z-index: 3;
    }

    .background-image::before {
        position: absolute;
        content: "";
        width: 200px;
        height: 100px;
        background-image: linear-gradient(45deg, gold, deeppink);
        border-radius: 10px;
        z-index: 2;
    }
</style>
