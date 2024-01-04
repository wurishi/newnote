<script lang="ts">
    const randomNum = (max: number, min = 0, u = 1) => {
        return ((min + Math.random() * max) * u).toFixed(1);
    };

    const randomConicGradient = () => {
        const cnt = 20;
        const arr = new Array<string>();
        for (let i = 0; i < cnt; i++) {
            // arr.push(
            //     `rgba(hsl(100, ${randomNum(250, 5, 0.1)}%, ${randomNum(
            //         1,
            //         1,
            //         0.01
            //     )}%), ${randomNum(100, 0, 0.01)}) 0 ${(i / 20) * 100}%`
            // );
            arr.push(
                `hsl(100, ${randomNum(250, 5, 1)}%, ${randomNum(
                    100,
                    1,
                    1
                )}%) 0 ${(i / 20) * 100}%`
            );
        }
        return `conic-gradient(${arr.join(",")})`;
    };
</script>
动画
<div class="c">
    <div class="div"></div>
</div>

<style>
    .c {
        position: relative;
        overflow: hidden;
    }
    .div {
        width: 400px;
        height: 400px;
        background: radial-gradient(hsl(9, 70%, 70%), black);
        /* background: conic-gradient(hsl(100, 76.6%, 80.3%) 0 0%,hsl(100, 137.5%, 33.3%) 0 5%,hsl(100, 187.4%, 79.8%) 0 10%,hsl(100, 43.0%, 24.0%) 0 15%,hsl(100, 60.7%, 21.1%) 0 20%,hsl(100, 164.2%, 68.2%) 0 25%,hsl(100, 81.2%, 81.6%) 0 30%,hsl(100, 198.0%, 85.2%) 0 35%,hsl(100, 32.8%, 1.7%) 0 40%,hsl(100, 192.1%, 7.1%) 0 45%,hsl(100, 229.4%, 71.8%) 0 50%,hsl(100, 216.1%, 18.7%) 0 55.00000000000001%,hsl(100, 121.4%, 78.0%) 0 60%,hsl(100, 198.8%, 58.3%) 0 65%,hsl(100, 145.2%, 26.4%) 0 70%,hsl(100, 116.3%, 51.0%) 0 75%,hsl(100, 127.6%, 45.0%) 0 80%,hsl(100, 188.1%, 100.8%) 0 85%,hsl(100, 72.1%, 11.4%) 0 90%,hsl(100, 50.9%, 58.6%) 0 95%); */
    }

    .div::before,
    .div::after {
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -100vmax;
        width: 200vmax;
        height: 200vmax;
        opacity: 0.5;
        mix-blend-mode: overlay;
        animation: rotate 2s ease-in-out infinite;
        content: "";
    }

    .div::before {
        background: conic-gradient(
            hsl(100, 76.6%, 80.3%) 0 0%,
            hsl(100, 137.5%, 33.3%) 0 5%,
            hsl(100, 187.4%, 79.8%) 0 10%,
            hsl(100, 43%, 24%) 0 15%,
            hsl(100, 60.7%, 21.1%) 0 20%,
            hsl(100, 164.2%, 68.2%) 0 25%,
            hsl(100, 81.2%, 81.6%) 0 30%,
            hsl(100, 198%, 85.2%) 0 35%,
            hsl(100, 32.8%, 1.7%) 0 40%,
            hsl(100, 192.1%, 7.1%) 0 45%,
            hsl(100, 229.4%, 71.8%) 0 50%,
            hsl(100, 216.1%, 18.7%) 0 55.00000000000001%,
            hsl(100, 121.4%, 78%) 0 60%,
            hsl(100, 198.8%, 58.3%) 0 65%,
            hsl(100, 145.2%, 26.4%) 0 70%,
            hsl(100, 116.3%, 51%) 0 75%,
            hsl(100, 127.6%, 45%) 0 80%,
            hsl(100, 188.1%, 100.8%) 0 85%,
            hsl(100, 72.1%, 11.4%) 0 90%,
            hsl(100, 50.9%, 58.6%) 0 95%
        );
    }

    .div::after {
        background: conic-gradient(
            hsl(100, 104.6%, 3.5%) 0 0%,
            hsl(100, 12.2%, 26.8%) 0 5%,
            hsl(100, 27.6%, 48.4%) 0 10%,
            hsl(100, 50.2%, 2.4%) 0 15%,
            hsl(100, 87.9%, 70.5%) 0 20%,
            hsl(100, 50.1%, 65.8%) 0 25%,
            hsl(100, 202.6%, 92.1%) 0 30%,
            hsl(100, 160.1%, 75.5%) 0 35%,
            hsl(100, 172.3%, 60.4%) 0 40%,
            hsl(100, 162.3%, 1.5%) 0 45%,
            hsl(100, 231.5%, 20.8%) 0 50%,
            hsl(100, 75.9%, 28%) 0 55.00000000000001%,
            hsl(100, 201.2%, 3.3%) 0 60%,
            hsl(100, 170.4%, 65%) 0 65%,
            hsl(100, 7.9%, 4.5%) 0 70%,
            hsl(100, 5.1%, 82.9%) 0 75%,
            hsl(100, 175.7%, 69.2%) 0 80%,
            hsl(100, 156.7%, 71.6%) 0 85%,
            hsl(100, 135.8%, 38.9%) 0 90%,
            hsl(100, 189.2%, 16.8%) 0 95%
        );
        animation-duration: 2.5s;
        animation-direction: reverse;
    }

    @keyframes rotate {
        to {
            transform: rotate(1turn);
        }
    }
</style>
