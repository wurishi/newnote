<script lang="ts">
    import { onMount } from "svelte";

    let dragging = false;
    let tLeft = 0,
        tTop = 0;

    let left = "0px";
    let top = "0px";

    const mouseDown = (e: MouseEvent) => {
        const el = e.target as HTMLElement;
        if (el && el.id === "move") {
            dragging = true;
            const rect = el.getBoundingClientRect();
            tLeft = e.clientX - rect.left;
            tTop = e.clientY - rect.top;
        }
    };
    const mouseUp = () => {
        dragging = false;
    };

    const mouseMove = (e: MouseEvent) => {
        if (dragging) {
            const moveX = e.clientX - tLeft;
            const moveY = e.clientY - tTop;

            left = moveX + "px";
            top = moveY + "px";
        }
    };

    onMount(() => {
        document.addEventListener("mousedown", mouseDown);
        document.addEventListener("mouseup", mouseUp);
        document.addEventListener("mousemove", mouseMove);

        return () => {
            document.removeEventListener("mousedown", mouseDown);
            document.removeEventListener("mouseup", mouseUp);
            document.removeEventListener("mousemove", mouseMove);
        };
    });
</script>

clip-path

<div class="wrap">
    <div class="container bg" />
    <div class="container clip">
        <div id="move" class="move" style="left:{left}; top: {top};" />
    </div>
    <div class="container bg2" />
</div>

<style>
    .wrap {
        width: 100vw;
        height: 300px;
        display: flex;
        background-color: white;
        margin: auto;
        position: relative;
    }

    .container {
        width: 200px;
        height: 200px;
        margin: auto;
        background: #fc0;
    }

    .bg,
    .bg2 {
        margin-top: -40px;
        background: #0f699e;
    }

    .bg2 {
        margin-top: 40px;
    }

    .clip {
        position: relative;
        clip-path: polygon(-1000% 0, 1000% 0, 1000% 100%, -1000% 100%);
    }

    .move {
        position: absolute;
        width: 100px;
        height: 100px;
        background: grey;
    }
</style>
