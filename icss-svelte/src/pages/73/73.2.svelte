<div class="box" />

<style>
    .box {
        width: 200px;
        height: 120px;
        border: 1px solid #03a9f3;
        position: relative;
        --borderColor: #03a9f3;
    }

    .box::before,
    .box::after {
        content: "";
        position: absolute;
        width: 20px;
        height: 20px;
        transition: all 0.5s ease-in-out;
    }

    .box::before {
        top: -5px;
        left: -5px;
        border-top: 1px solid var(--borderColor);
        border-left: 1px solid var(--borderColor);
    }
    .box::after {
        right: -5px;
        bottom: -5px;
        border-bottom: 1px solid var(--borderColor);
        border-right: 1px solid var(--borderColor);
    }

    .box:hover::before,
    .box:hover::after {
        width: calc(100% + 9px);
        height: calc(100% + 9px);
    }
</style>
