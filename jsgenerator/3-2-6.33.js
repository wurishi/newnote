csp.go(function* () {
    const element = document.querySelector('#uiElement1');
    const channel = listen(element, 'mousemove');
    while (true) {
        const evt = yield csp.take(channel);
        const x = evt.layerX || evt.clientX;
        const y = evt.layerY || evt.clientY;
        element.textContent = x + ',' + y;
    }
});

function listen(element, type) {
    const channel = csp.chan();
    element.addEventListener(type, (event) => csp.putAsync(channel, event));
    return channel;
}
