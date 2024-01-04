配合 :placeholder-shown 伪类实现表单效果

<div class="component">
    <input type="text" placeholder="请输入内容" />
    <button class="button">提交</button>
</div>

<style>
    .component {
        position: relative;
    }

    input {
        width: 300px;
        height: 40px;
        line-height: 40px;
        padding: 0 15px;
        outline: none;
        border: 1px solid rgba(0, 0, 0, 0.3);
    }

    .button {
        position: absolute;
        top: 50%;
        transform: translate(100px, -50%);
        opacity: 0;
        transition: all 0.5s;
    }

    .component:focus-within input {
        border: 1px solid blue;
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.3);
    }

    .component:focus-within input:not(:placeholder-shown) ~ .button {
        opacity: 1;
        transform: translate(calc(-100% - 15px), -50%);
    }
</style>
