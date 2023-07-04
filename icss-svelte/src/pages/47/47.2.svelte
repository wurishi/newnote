<script lang="ts">
    let x = 0,
        y = 0;
    let opacity = "0";

    const mouseMove = (e: MouseEvent) => {
        // const rect = (e.target as HTMLDivElement).getBoundingClientRect();
        x = e.pageX + 500;
        y = e.pageY;
    };

    const mouseLeave = () => {
        opacity = "0";
    };

    const mouseEnter = () => {
        opacity = "1";
    };
</script>

Gooey

<div class="page">
    <div
        class="blobs"
        on:mousemove={mouseMove}
        on:mouseenter={mouseEnter}
        on:mouseleave={mouseLeave}
    >
        <div
            class="blob four move"
            style={`left: calc(${x} * 0.27px); top: calc(${y} * 0.27px); opacity: ${opacity};`}
        />
        <div class="norm blob one" />
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
            <filter id="goo">
                <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="10"
                    result="blur"
                />
                <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                    result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
            </filter>
        </defs>
    </svg>
</div>

<style>
    .page {
        position: relative;
        contain: paint;
        margin: 0px;
        background: #eceff1;
        /* -webkit-backface-visibility: hidden; */
        width: 100vw;
        height: 100vh;
    }
    .blob {
        position: fixed;
        background: #42a5f5;
        background-size: 1000% 1000%;
        top: 50%;
        width: 100px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        color: white;
        font-size: 40px;
        border-radius: 100%;
        margin-top: -50px;
        margin-left: -50px;
    }

    .blobs {
        filter: url("#goo");
        position: fixed;
        left: calc(50vw - 250px);
        top: calc(50vh - 250px);
        width: 500px;
        height: 500px;
        background: transparent;
        border: 3px solid;
        border-color: transparent;
    }

    .one {
        left: 50%;
        filter: blur(15px);
    }
    .four {
        filter: blur(20px);
        position: fixed;
        background: rgba(77, 208, 225, 0.7) !important;
        /* margin-left: calc(50vw - 120px);
        margin-top: calc(50vh - 120px); */
        transition: opacity 0.3s ease;
        z-index: 5;
        border: 1px solid red;
    }

    .vsfr {
        opacity: 1 !important;
    }
</style>
