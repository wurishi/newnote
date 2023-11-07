<script lang="ts">
    const list = [];
    for (let i = 0; i < 100; i++) {
        list.push(i);
    }
</script>

<div class="page">
    <p>Emilia</p>
    <div class="card">
        {#each list as item}
            <div class="snow" />
        {/each}
    </div>
</div>

<style>
    .page {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: black;
    }

    .card {
        --snow-size: 3em;
        width: calc(var(--snow-size) * 10);
        height: calc(var(--snow-size) * 10);
        padding: 10em;
        display: flex;
        flex-wrap: wrap;
        background: black;
        filter: blur(15px) contrast(30);
    }

    .snow {
        position: relative;
        width: var(--snow-size);
        height: var(--snow-size);
        border-radius: 100%;
    }

    .snow::after {
        position: absolute;
        content: "";
        left: 0;
        width: inherit;
        height: inherit;
        background: white;
        transition: 30s cubic-bezier(0.19, 1, 0.22, 1);
    }
    .snow:hover::after {
        transform: scale(0);
        transition-duration: 0.3s;
    }

    p {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 9999;
        color: white;
        font-size: 4em;
        line-height: 1em;
        letter-spacing: 0.1em;
        transform: translate(-47%, -160%);
        pointer-events: none;
        filter: blur(1px) contrast(20);
    }
</style>
