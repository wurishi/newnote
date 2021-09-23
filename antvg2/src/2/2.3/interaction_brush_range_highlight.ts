import { Chart } from '@antv/g2';
import Top2000 from '../../data/top2000.json';
import DataSet from '@antv/data-set';

export default function () {
    const ds = new DataSet();
    const dv = ds
        .createView('test')
        .source(Top2000)
        .transform({
            as: ['count'],
            groupBy: ['release'],
            operations: ['count'],
            type: 'aggregate',
        });

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });
    chart.data(dv.rows);
    chart.scale({
        count: {
            alias: 'top2000 唱片总量',
            nice: true,
        },
        release: {
            tickInterval: 5,
            alias: '唱片发行年份',
        },
    });
    chart.interval().position('release*count');

    chart.interaction('element-range-highlight');

    chart.render();
}

export const MENU1 = '2';
export const MENU2 = '3';
export const TITLE = '框选高亮';
