const rAF = function (w: any) {
    return w.requestAnimationFrame
        || w.webkitRequestAnimationFrame
        || function (callback: any) {
            window.setTimeout(callback, 1000 / 60)
        }
}(window);

export default function start(callback: (fps: number) => void) {
    let frame = 0;
    let allFrameCount = 0;
    let lastTime = Date.now();
    let lastFrameTime = Date.now();

    const loop = function () {
        const now = Date.now();
        const fs = (now - lastFrameTime);
        let fps = Math.round(1000 / fs);

        lastFrameTime = now;
        allFrameCount++;
        frame++;

        if (now > 1000 + lastTime) {
            fps = Math.round((frame * 1000) / (now - lastTime))
            frame = 0;
            lastTime = now;
        }

        callback && callback(fps);

        rAF(loop);
    }
    loop();
}