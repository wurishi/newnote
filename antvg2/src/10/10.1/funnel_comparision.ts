import { Chart } from '@antv/g2';

export default function () {
    const expectData = [
        { value: 100, name: '展现' },
        { value: 80, name: '点击' },
        { value: 60, name: '访问' },
        { value: 40, name: '咨询' },
        { value: 30, name: '订单' },
    ];
    const actualData = [
        { value: 80, name: '展现' },
        { value: 50, name: '点击' },
        { value: 30, name: '访问' },
        { value: 10, name: '咨询' },
        { value: 5, name: '订单' },
    ];

    const colors = ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF'];

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [20, 60, 40],
    });
    chart.coordinate('rect').transpose().scale(1, -1);
    chart.axis(false);
    chart.legend(false);
    chart.tooltip({
        showTitle: false,
        showMarkers: false,
        shared: true,
        itemTpl:
            '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
    });

    const expectView = chart.createView();
    expectView.data(expectData);
    expectView
        .interval()
        .adjust('symmetric')
        .position('name*value')
        .color('name', colors)
        .shape('pyramid')
        .tooltip('name*value', (name, value) => ({
            name: '预期' + name,
            value,
        }))
        .label('name', {
            offset: 35,
            labelLine: {
                style: {
                    lineWidth: 1,
                    stroke: 'rgba(0,0,0,0.15)',
                },
            },
        })
        .animate({
            appear: {
                animation: 'fade-in',
            },
        });

    const actualView = chart.createView();
    actualView.data(actualData);
    actualView
        .interval()
        .adjust('symmetric')
        .position('name*value')
        .color('name', colors)
        .shape('pyramid')
        .tooltip('name*value', (name, value) => ({
            name: '实际' + name,
            value,
        }))
        .style({ lineWidth: 1, stroke: '#fff' })
        .animate({
            appear: { animation: 'fade-in' },
            update: { animation: 'fade-in' },
        });

    chart.interaction('element-active');

    chart.render();
}

export const MENU1 = '10';
export const MENU2 = '1';
export const TITLE = '对比漏斗图';
