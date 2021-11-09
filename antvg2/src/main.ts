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

let prevClearFn: any = null;

function clearCharts() {
    prevClearFn && prevClearFn();
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
        {
            name: '面积图',
            children: ['基础面积图', '堆叠面积图', '区间面积图', '河流图'],
        },
        {
            name: '柱状图',
            children: [
                '基础柱状图',
                '分组柱状图',
                '堆叠柱状图',
                '分组层叠柱状图',
                '直方图',
            ],
        },
        {
            name: '条形图',
            children: ['基础条形图', '分组条形图', '堆叠条形图'],
        },
        {
            name: '饼图',
            children: ['基础饼图', '环图', '南丁格尔玫瑰图', '嵌套饼图'],
        },
        {
            name: '点图',
            children: ['散点图', '气泡图', '扰动点图'],
        },
        {
            name: '雷达图',
            children: ['雷达图'],
        },
        {
            name: '漏斗图',
            children: ['漏斗图'],
        },
        {
            name: '热力图',
            children: ['色块图', '日历热力图', '热力图'],
        },
        {
            name: '箱型图',
            children: ['箱型图'],
        },
        {
            name: '烛形图',
            children: ['烛形图'],
        },
        {
            name: '仪表盘',
            children: ['仪表盘'],
        },
        {
            name: '地图',
            children: ['地图'],
        },
        {
            name: '分面',
            children: ['分面分类'],
        },
        {
            name: '关系图',
            children: ['关系图'],
        },
        {
            name: '组件使用',
            children: ['Annotation', 'Label', 'Tooltip', '图例']
        },
        {
            name: '其他图表',
            children: ['其他图表'],
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
                        prevClearFn = module.default();
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
