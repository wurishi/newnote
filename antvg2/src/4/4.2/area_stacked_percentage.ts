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
    ];

    const dv = new DataSet.DataView().source(data);
    dv.transform({
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
        year: {
            type: 'linear',
            tickInterval: 50,
        },
        percent: {
            formatter: (value) => {
                value = +value || 0;
                value = value * 100;
                return value;
            },
            alias: 'percent(%)',
        },
    });

    chart.tooltip({
        showCrosshairs: true,
        shared: true,
    });

    chart.area().adjust('stack').position('year*percent').color('country');
    chart.line().adjust('stack').position('year*percent').color('country');

    chart.render();
}

export const MENU1 = '4';
export const MENU2 = '2';
export const TITLE = '百分比堆叠面积图';
