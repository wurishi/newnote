enum TRIGGER_EVENT {
    MOUSE_ENTER = 'mouseenter',
    MOUSE_LEAVE = 'mouseleave',
    MOUSE_DOWN = 'mousedown',
    MOUSE_MOVE = 'mousemove',
    MOUSE_UP = 'mouseup',
    DRAG_START = 'dragstart',
    DRAG = 'drag',
    DRAG_END = 'dragend',
    CHANGE = 'change',
    DBCLICK = 'dblclick',
}

const TRIGGER = {
    PLOT: (evt: TRIGGER_EVENT) => `plot:${evt}`,
    MASK: (evt: TRIGGER_EVENT) => `mask:${evt}`,
    DOCUMENT: (evt: TRIGGER_EVENT) => `document:${evt}`,
};

const ACTION = {
    CURSOR: (cursor: string) => `cursor:${cursor}`,
    RECT_MASK: (action: string) => `rect-mask:${action}`,
    ELEMENT_SIBLING_FILTER: (action: string) =>
        `element-sibling-filter:${action}`,
    ELEMENT_SIBLING_HIGHLIGHT: (action: string) =>
        `element-sibling-highlight:${action}`,
    ELEMENT_RANGE_HIGHLIGHT: (action: string) =>
        `element-range-highlight:${action}`,
    SCALE_TRANSLATE: (action: string) => `scale-translate:${action}`,
};

export default {
    TRIGGER,
    TRIGGER_EVENT,
    ACTION,
};
