使用伪元素及透明度进行优化

<section>
    <div class="normal">正常</div>
    <div class="box">优化</div>
</section>

<style>
    section {
        display: flex;
        height: 200px;
    }

    div {
        text-align: center;
        width: 100px;
        line-height: 100px;
        position: relative;
        display: inline-block;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.5);
        transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
        margin: auto;
        cursor: pointer;
        transform: scale(1.5);
    }

    .normal:hover {
        transform: scale(1.75, 1.75);
        box-shadow: 0 16px 24px rgba(0, 0, 0, 0.7);
    }

    .box::after {
        content: "";
        position: absolute;
        border-radius: 5px;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-shadow: 0 16px 24px rgba(0, 0, 0, 0.7);
        opacity: 0;
        transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    .box:hover {
        transform: scale(1.75, 1.75);
    }
    .box:hover::after {
        opacity: 1;
    }
    
</style>
