import { Chart } from '@antv/g2';
import data from '../../data/diamond.json';
import DataSet from '@antv/data-set';

export default function () {
    const ds = new DataSet();
    const dv = ds.createView('diamond').source(data);
    dv.transform({
        type: 'bin.histogram',
        field: 'depth',
        binWidth: 4, // 矩形的宽度
        as: ['depth', 'count'],
    });

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });
    chart.data(dv.rows);

    chart.scale({
        depth: {
            tickInterval: 4,
        },
        count: {
            nice: true,
        },
    });

    chart.tooltip({
        position: 'top',
        showMarkers: false,
    });

    chart.interval().position('depth*count');

    chart.interaction('element-highlight');

    chart.render();
}

export const MENU1 = '5';
export const MENU2 = '5';
export const TITLE = '直方图范围刻度';
