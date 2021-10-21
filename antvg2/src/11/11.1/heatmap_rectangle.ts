import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';
import data from '../../data/gaussion-distribution.json';
import { GeekBlue10 } from '../../utils/theme';

export default function () {
    const ds = new DataSet({
        state: {
            sizeEncoding: false,
        },
    });
    const dv = ds.createView('diamond').source(data);
    dv.transform({
        sizeByCount: '$state.sizeEncoding',
        type: 'bin.rectangle',
        fields: ['x', 'y'],
        bins: [20, 10],
    });

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [32, 32, 48, 32],
    });
    chart.data(dv.rows);
    chart.scale({
        y: { nice: true },
        count: { nice: true },
    });

    chart.tooltip({
        showMarkers: false,
        showTitle: false,
    });

    chart.polygon().position('x*y').color('count', GeekBlue10);

    chart.interaction('element-active');
    chart.render();
}

export const MENU1 = '11';
export const MENU2 = '1';
export const TITLE = '矩形分箱图';
