import { Chart } from '@antv/g2';
import data from '../../data/baby-names.json';
import DataSet from '@antv/data-set';

export default function () {
    const dv = new DataSet.DataView()
        .source(data)
        .transform({
            type: 'fill-rows',
            groupBy: ['name'],
            orderBy: ['year'],
        })
        .transform({
            type: 'impute',
            field: 'n',
            method: 'value',
            value: 0,
        })
        .transform({
            type: 'aggregate',
            fields: ['n'],
            operations: ['sum'],
            groupBy: ['year', 'name'],
            orderBy: ['year'],
            as: ['count'],
        });

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [20, 140, 60, 50],
    });
    chart.data(dv.rows);
    chart.scale('year', { tickInterval: 20 });
    chart.legend({ position: 'right' });
    chart.axis('count', {
        line: {
            style: {
                lineWidth: 1,
                stroke: '#BFBFBF',
            },
        },
        tickLine: {
            length: 8,
            style: {
                stroke: '#ddd',
            },
        },
        grid: null,
    });

    chart
        .area()
        .position('year*count')
        .adjust(['stack', 'symmetric'])
        .color('name')
        .shape('smooth')
        .style({
            fillOpacity: 0.85,
        });

    chart.render();
}

export const MENU1 = '4';
export const MENU2 = '4';
export const TITLE = '河流图';
