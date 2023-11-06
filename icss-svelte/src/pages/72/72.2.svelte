<div class="container">
    <div class="btn">Hover Me</div>
    <p class="content">能够适配任意高度。能够适配任意高度。能够适配任意高度。</p>
</div>

<div class="container">
    <div class="btn">Hover Me</div>
    <p class="content">能够适配任意高度。能够适配任意高度。能够适配任意高度。能够适配任意高度。能够适配任意高度。能够适配任意高度。</p>
</div>

<style>

p {
    width: 100px;
    overflow: hidden;
    transition: all 1s linear;
    max-height: 0;
    border: 0px solid red;
}

.btn {
    width: 80px;
}

.btn:hover ~ .content {
    max-height: 1000px;
    border-width: 1px;
}

</style>