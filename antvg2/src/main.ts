const modules = import.meta.glob('./*/*/*.ts');

import { GUI } from 'dat.gui';

interface GUIMenus {
    [key: string]: GUI;
}

function* createMenu(
    parent: GUI,
    arr: { name: string; children?: any }[],
    parentIdx?: number,
    guiMenus: GUIMenus = {}
) {
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

function clearCharts() {
    const chart = document.getElementById('chart');
    chart.innerHTML = '';
}

function setHistory(key: string) {
    window.localStorage.setItem('history', key);
}

let historyFn: any = null;

function getHistory() {
    return window.localStorage.getItem('history');
}

export default (function () {
    const menus = [
        {
            name: '场景案例',
        },
        {
            name: '交互语法',
            children: ['图形元素', '图表组件', '框选', '其他'],
        },
        {
            name: '折线图',
            children: [
                '基础折线图',
                '阶梯折线图',
                '路径图',
                '核函数概率密度回归曲线',
            ],
        },
    ];
    const gui = new GUI({ width: 400 });
    let guiMenus: GUIMenus = {};
    for (guiMenus of createMenu(gui, menus)) {
    }

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
            const { MENU1, MENU2, TITLE } = module;
            const folder = guiMenus[MENU1 + '_' + MENU2];
            if (folder) {
                const obj = {
                    foo: () => {
                        clearCharts();
                        document.title = TITLE + ' ' + key;
                        module.default();
                        setHistory(key);
                    },
                };
                folder.add(obj, 'foo').name(TITLE);
                if (getHistory() == key) {
                    historyFn = obj.foo;
                    historyFn && historyFn();
                    folder.open();
                    folder.parent && folder.parent.open();
                }
            } else {
                console.warn('未找到对应的folder', module);
            }
        });
    });
})();
