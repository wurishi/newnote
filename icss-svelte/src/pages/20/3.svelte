<script lang="ts">
    let flag = false;

    const switchFlag = () => {
        flag = !flag;
    }
</script>

transform <label for="flag">显示原理：</label><input id="flag" type="checkbox" bind:checked={flag} />
<div class:show={flag} />

<style>
    div {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100px;
    }

    .show {
        overflow: visible;
        border: 1px solid black;
    }

    div::before {
        content: "";
        position: absolute;
        top: -100%;
        left: -100%;
        bottom: -100%;
        right: -100%;
        background: linear-gradient(45deg, var(--color1) 0%, var(--color2) 50%, var(--color3) 100%);
        background-size: 100% 100%;
        animation: bgposition 5s infinite linear alternate;
        z-index: -1;
    }

    @keyframes bgposition {
        0% {
            transform: translate(30%, 30%);
        }
        25% {
            transform: translate(30%, -30%);
        }
        50% {
            transform: translate(-30%, -30%);
        }
        75% {
            transform: translate(-30%, 30%);
        }
        100% {
            transform: translate(30%, 30%);
        }
    }
</style>