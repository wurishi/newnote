import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';

export default function () {
    const data = [
        { item: 'Design', a: 70, b: 30 },
        { item: 'Development', a: 60, b: 70 },
        { item: 'Marketing', a: 50, b: 60 },
        { item: 'Users', a: 40, b: 50 },
        { item: 'Test', a: 60, b: 70 },
        { item: 'Language', a: 70, b: 50 },
        { item: 'Technology', a: 50, b: 40 },
        { item: 'Support', a: 30, b: 40 },
        { item: 'Sales', a: 60, b: 40 },
        { item: 'UX', a: 50, b: 60 },
    ];
    const dv = new DataSet.DataView().source(data);
    dv.transform({
        type: 'fold',
        fields: ['a', 'b'],
        key: 'user',
        value: 'score',
    });

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });
    chart.data(dv.rows);
    chart.scale('score', { min: 0, max: 80 });
    chart.coordinate('polar', {
        radius: 0.8,
    });
    chart.tooltip({
        shared: true,
        showCrosshairs: true,
        crosshairs: {
            line: {
                style: {
                    lineDash: [4, 4],
                    stroke: '#333',
                },
            },
        },
    });
    chart.axis('item', {
        line: null,
        tickLine: null,
        grid: {
            line: {
                style: {
                    lineDash: null,
                },
            },
        },
    });
    chart.axis('score', {
        line: null,
        tickLine: null,
        grid: {
            line: {
                type: 'line',
                style: {
                    lineDash: null,
                },
            },
        },
    });

    chart.line().position('item*score').color('user').size(2);
    chart
        .point()
        .position('item*score')
        .color('user')
        .shape('circle')
        .size(4)
        .style({
            stroke: '#fff',
            lineWidth: 1,
            fillOpacity: 1,
        });
    chart.area().position('item*score').color('user');

    chart.render();
}

export const MENU1 = '9';
export const MENU2 = '1';
export const TITLE = '基础雷达图';
