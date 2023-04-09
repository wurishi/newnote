export function cssTest(property: string, value?: string): boolean {
    let el = document.getElementById('test-display-none');
    if (!el) {
        el = document.createElement('div');
        // el.id = 'test-display-none';
        // el.style.display = 'none';
        // document.body.appendChild(el);
    }

    if (value) {
        el.style[property] = value;
        if (el.style[property]) {
            return true;
        }
    } else {
        return property in el.style;
    }

    return false;
}