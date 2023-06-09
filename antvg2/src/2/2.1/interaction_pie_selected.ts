import { Chart } from '@antv/g2';

export default function () {
    const data = [
        { item: '事例一', count: 40, percent: 0.4 },
        { item: '事例二', count: 21, percent: 0.21 },
        { item: '事例三', count: 17, percent: 0.17 },
        { item: '事例四', count: 13, percent: 0.13 },
        { item: '事例五', count: 9, percent: 0.09 },
    ];

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });

    chart.data(data);

    chart.coordinate('theta', { radius: 0.85 });

    chart.scale('percent', {
        formatter: (val) => val * 100 + '%',
    });
    chart.tooltip({
        showTitle: false,
        showMarkers: false,
    });
    chart.axis(false); // 关闭坐标轴
    const interval = chart
        .interval()
        .adjust('stack')
        .position('percent')
        .color('item')
        .label('percent', {
            offset: -40,
            style: {
                textAlign: 'center',
                shadowBlur: 2,
                shadowColor: 'rgba(0, 0, 0, .45)',
                fill: '#fff',
            },
        })
        .tooltip('item*percent', (item, percent) => ({
            name: item,
            value: percent * 100 + '%',
        }))
        .style({
            lineWidth: 1,
            stroke: '#fff',
        });

    chart.interaction('element-single-selected');
    chart.render();

    interval.elements[0].setState('selected', true);
}

export const MENU1 = '2';
export const MENU2 = '1';
export const TITLE = '饼图单选';
