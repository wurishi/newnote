容器定宽，文本不定宽

<div class="wrap">
    <p title="我的宽度是正常宽度">我的宽度是正常宽度</p>
    <p title="我的宽度是溢出了一小部分">我的宽度是溢出了一小部分</p>
    <p title="我的宽度是溢出了溢出了很大一部分">
        我的宽度是溢出了溢出了很大一部分
    </p>
    <span title="我的宽度是正常宽度">我的宽度是正常宽度</span>
    <span title="我的宽度是溢出了溢出了很大一部分"
        >我的宽度是溢出了溢出了很大一部分</span
    >
</div>

<style>
    .wrap {
        position: relative;
        width: 150px;
        overflow: hidden;
        background-color: grey;
    }

    p {
        white-space: nowrap;
        display: inline-block;
    }

    p:hover {
        animation: move 1.5s infinite alternate linear;
    }

    @keyframes move {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(calc(-100% + 150px), 0);
        }
    }

    span {
        white-space: nowrap;
        display: inline-block;
    }

    span:hover {
        animation: move1 1.5s infinite alternate linear;
    }

    @keyframes move1 {
        from {
            left: 0;
            transform: translate(0, 0);
        }
        to {
            left: 100%;
            transform: translate(-100%, 0);
        }
    }
</style>
