import { Chart } from '@antv/g2';

export default function () {
    const data = [
        { x: '分类一', y: [76, 100] },
        { x: '分类二', y: [56, 108] },
        { x: '分类三', y: [38, 129] },
        { x: '分类四', y: [58, 155] },
        { x: '分类五', y: [45, 120] },
        { x: '分类六', y: [23, 99] },
        { x: '分类七', y: [18, 56] },
        { x: '分类八', y: [18, 34] },
    ];

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });

    chart.data(data);
    chart.scale('y', { nice: true });

    chart.tooltip({
        showMarkers: false,
    });

    chart.interaction('element-active');

    chart
        .interval()
        .position('x*y')
        .animate({
            appear: {
                animation: 'zoom-in',
            },
        });

    chart.render();
}

export const MENU1 = '5';
export const MENU2 = '1';
export const TITLE = '区间柱状图';
