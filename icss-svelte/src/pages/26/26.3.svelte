<script lang="ts">
    let flag = true
</script>

给文字增加高光动画: <label for="flag">开关</label><input name="flag" bind:checked={flag} type="checkbox" />
<p data-text="Lorem ipsum dolor" class:flag >Lorem ipsum dolor</p>

<style>
    .flag {
        -webkit-background-clip: text;
    }
    .flag::after {
        -webkit-background-clip: text;
    }

    p {
        font-size: 50px;
        position: relative;
        color: transparent;
        background-color: #E8A95B;
        font-weight: bold;
    }

    p::after {
        content: attr(data-text);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-image: linear-gradient(120deg, transparent 0%, transparent 6rem, white 11rem, transparent 11.15rem, transparent 15rem, rgba(255, 255, 255, 0.3) 20rem, transparent 25rem, transparent 27rem, rgba(255, 255, 255, 0.6) 32rem, white 33rem, rgba(255, 255, 255, 0.3) 33.15rem, transparent 38rem, transparent 40rem, rgba(255, 255, 255, 0.3) 45rem, transparent 50rem, transparent 100%);
        background-size: 150% 100%;
        background-repeat: no-repeat;
        animation: shine 5s linear infinite;
    }

    @keyframes shine {
        0% {
            background-position: 50% 0;
        }
        100% {
            background-position: -190% 0;
        }
    }
</style>