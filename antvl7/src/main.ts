import { GUI } from 'dat.gui';

const modules = import.meta.glob('./*/*/*.ts');

let prevClearFn: any = null;

function clear() {
    prevClearFn && prevClearFn();
    const map = document.getElementById('map');
    map && (map.innerHTML = '');
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
            name: '官方精品库',
            children: ['动画', '基础可视化'],
        },
        {
            name: 'React 组件',
            children: [
                'COVID-19 地图',
                'Scene 组件',
                'Layer 组件',
                'Control 组件',
            ],
        },
        {
            name: '行政区划',
            children: ['填充图', '气泡图', '钻取地图', 'React 组件'],
        },
        {
            name: '绘制组件',
            children: ['绘制组件', 'UI 控件'],
        },
        {
            name: '点图层',
            children: [
                '气泡地图',
                '文本标注',
                '散点地图',
                '亮度图',
                '聚合图',
                '符号地图',
                '3D 柱状地图',
                '复合图表地图',
                '自定义 Marker',
            ],
        },
        {
            name: '线图层',
            children: ['路径地图', '弧线地图', '线动画', '等值线地图'],
        },
        {
            name: '面图层',
            children: ['填充地图', '3D填充图'],
        },
        {
            name: '热力图',
            children: ['经典热力图', '蜂窝热力图', '网格热力图'],
        },
        {
            name: '栅格图层',
            children: ['栅格图层'],
        },
        {
            name: '教程示例',
            children: ['地图', 'Marker', '组件', '图层'],
        },
    ];
    const gui = new GUI({ width: 400 });
    const parentElement = gui.domElement.parentElement;
    if (parentElement) {
        parentElement.style.position = 'fixed';
        parentElement.style.zIndex = '1000';
    }
    let guiMenus: any = {};
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
            const arr = key.split('/');
            const [_, menu1, menu2] = arr;
            const { TITLE } = module;
            const folder = guiMenus[menu1 + '_' + menu2.split('.')[1]];
            if (folder) {
                const obj = {
                    foo: () => {
                        clear();
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
                    folder.parent?.open();
                }
            } else {
                console.warn('未找到对应的folder', module, guiMenus);
            }
        });
    });
})();
