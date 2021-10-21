import { Chart } from '@antv/g2';
import data from '../../data/stock-03.json';
import DataSet from '@antv/data-set';

export default function () {
    const dv = new DataSet.DataView();
    dv.source(data).transform({
        type: 'map',
        callback: (obj) => ({
            ...obj,
            stockRange: [obj.start, obj.end, obj.highest, obj.lowest],
        }),
    });

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });
    chart.data(dv.rows);
    chart.scale({
        date: {
            type: 'time',
            tickCount: 10,
        },
        range: {
            min: 20,
            max: 35,
            tickInterval: 2,
        },
        mean: { min: 20, max: 35 },
        stockRange: { min: 20, max: 35 },
    });
    chart.axis('mean', false);
    chart.axis('stockRange', false);
    chart.tooltip({
        showCrosshairs: true,
        shared: true,
    });
    chart.area().position('date*range').color('#64b5f6').animate(false);
    chart
        .schema()
        .position('date*stockRange')
        .color('trend', (val) => {
            if (val === 'up') {
                return '#f04864';
            }
            if (val === 'down') {
                return '#2fc25b';
            }
        })
        .shape('candle')
        .tooltip('start*end*highest*lowest')
        .animate({
            appear: {
                animation: 'wave-in',
            },
        });

    chart.line().position('date*mean').color('#FACC14');
    chart.render();
}

export const MENU1 = '13';
export const MENU2 = '1';
export const TITLE = '股票图与范围区域图';
