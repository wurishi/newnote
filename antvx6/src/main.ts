import { GUI } from 'dat.gui';

const modules = import.meta.glob('./*/*/*.ts');

let prevClearFn: any = null;

function clear() {
    prevClearFn && prevClearFn();
    const app = document.getElementById('app');
    app && (app.innerHTML = '');
}

function setHistory(key: string) {
    window.localStorage.setItem('history', key);
}

let historyFn: any = null;

function getHistory() {
    return window.localStorage.getItem('history');
}

function* createMenu(
    parent: GUI,
    arr: { name: string; children?: any }[],
    parentIdx?: number,
    guiMenus: any = {}
): any {
    if (Array.isArray(arr)) {
        let idx = 0;
        for (const item of arr) {
            const { name, children } = item;
            const parentLabel =
                parentIdx === undefined ? '' : parentIdx + 1 + '.';
            const menu = parent.addFolder(
                `${parentLabel}${idx + 1}${parentLabel ? '' : '.'} ${
                    typeof item === 'string' ? item : name
                }`
            );
            if (parentIdx !== undefined) {
                guiMenus[parentIdx + 1 + '_' + (idx + 1)] = menu;
            }
            yield* createMenu(menu, children, idx, guiMenus);
            idx++;
        }
    }
    yield guiMenus;
}

export default (function () {
    const menus = [
        {
            name: 'Tutorials',
            children: [
                '画布 Graph',
                '基类 Cell',
                '节点 Node',
                '边 Edge',
                '群组 Group',
                '连接桩 Port',
                '网格 Grid',
                '背景 Background',
                '剪切板 Clipboard',
                '撤销/重做 Redo/Undo',
                '点选/框选',
                '对齐线 Snapline',
                '滚动 Scroller',
                '小地图 MiniMap',
                '拖拽 Dnd',
                '键盘快捷键 Keyboard',
                '滚轮缩放 MouseWheel',
                '节点和边的交互',
            ],
        },
        {
            name: 'Component',
            children: ['Practices', 'FAQ'],
        },
        {
            name: 'Node',
        },
        {
            name: 'Edge',
        },
        {
            name: 'Graph',
        },
        {
            name: 'Interaction',
        },
        {
            name: 'Layout',
            children: ['General Layout', 'Tree Layout'],
        },
    ];

    const gui = new GUI({ width: 400 });
    let guiMenus: any = {};
    for (guiMenus of createMenu(gui, menus));
    gui.add(
        {
            auto: () => {
                historyFn && historyFn();
            },
        },
        'auto'
    ).name('History');

    Object.keys(modules).forEach((key) => {
        modules[key]().then((module) => {
            const arr = key.split('/');
            const [_, menu1, menu2] = arr;
            const { TITLE } = module;
            const folder = guiMenus[menu1 + '_' + menu2.split('.')[1]];
            if (folder) {
                const obj = {
                    foo: () => {
                        clear();
                        document.title = TITLE + ' ' + key;
                        prevClearFn = module.default();
                        setHistory(key);
                    },
                };
                folder.add(obj, 'foo').name(TITLE);
                if (getHistory() === key) {
                    historyFn = obj.foo;
                    historyFn && historyFn();
                    folder.open();
                    folder.parent?.open();
                }
            } else {
                console.warn('未找到对应的folder', module, guiMenus);
            }
        });
    });
})();
