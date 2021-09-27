import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';
import data from '../../data/diamond.json';

export default function () {
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
        type: 'bin.histogram',
        field: 'depth',
        binWidth: 1,
        groupBy: ['cut'],
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
            tickInterval: 1,
        },
        count: {
            nice: true,
        },
    });

    chart.tooltip({
        position: 'top',
        shared: true,
        showMarkers: false,
    });

    chart.interval().position('depth*count').color('cut').adjust('stack');

    chart.interaction('active-region');

    chart.render();
}

export const MENU1 = '5';
export const MENU2 = '5';
export const TITLE = '层叠直方图';
