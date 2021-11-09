import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';

export default function () {
    const data = [
        { country: 'Asia', year: '1750', value: 502 },
        { country: 'Asia', year: '1800', value: 635 },
        { country: 'Asia', year: '1850', value: 809 },
        { country: 'Asia', year: '1900', value: 947 },
        { country: 'Asia', year: '1950', value: 1402 },
        { country: 'Asia', year: '1999', value: 3634 },
        { country: 'Asia', year: '2050', value: 5268 },
        { country: 'Africa', year: '1750', value: 106 },
        { country: 'Africa', year: '1800', value: 107 },
        { country: 'Africa', year: '1850', value: 111 },
        { country: 'Africa', year: '1900', value: 133 },
        { country: 'Africa', year: '1950', value: 221 },
        { country: 'Africa', year: '1999', value: 767 },
        { country: 'Africa', year: '2050', value: 1766 },
        { country: 'Europe', year: '1750', value: 163 },
        { country: 'Europe', year: '1800', value: 203 },
        { country: 'Europe', year: '1850', value: 276 },
        { country: 'Europe', year: '1900', value: 408 },
        { country: 'Europe', year: '1950', value: 547 },
        { country: 'Europe', year: '1999', value: 729 },
        { country: 'Europe', year: '2050', value: 628 },
        { country: 'Oceania', year: '1750', value: 200 },
        { country: 'Oceania', year: '1800', value: 200 },
        { country: 'Oceania', year: '1850', value: 200 },
        { country: 'Oceania', year: '1900', value: 300 },
        { country: 'Oceania', year: '1950', value: 230 },
        { country: 'Oceania', year: '1999', value: 300 },
        { country: 'Oceania', year: '2050', value: 460 },
    ];

    const ds = new DataSet();
    const dv = ds
        .createView('demo')
        .source(data)
        .transform({
            type: 'percent',
            field: 'value',
            dimension: 'country',
            groupBy: ['year'],
            as: 'percent',
        });

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });
    chart.data(dv.rows);
    chart.scale({
        percent: { min: 0, formatter: (val) => (+val * 100).toFixed(2) + '%' },
    });
    chart.tooltip(false);
    chart
        .interval()
        .adjust('stack')
        .position('year*percent')
        .label('percent', {
            position: 'middle',
            offset: 0,
            style: {
                fill: '#fff',
                stroke: null,
            },
        })
        .color('country');

    chart.interaction('element-highlight-by-color');
    chart.render();
}

export const MENU1 = '18';
export const MENU2 = '2';
export const TITLE = 'label-位置';
