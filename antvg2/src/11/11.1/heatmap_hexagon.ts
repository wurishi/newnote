import { Chart } from '@antv/g2';
import data from '../../data/gaussion-distribution.json';
import DataSet from '@antv/data-set';
import { Blue5 } from '../../utils/theme';

export default function () {
    const ds = new DataSet({
        state: { sizeEncoding: false },
    });

    const dv = ds
        .createView()
        .source(data)
        .transform({
            sizeByCount: '$state.sizeEncoding',
            type: 'bin.hexagon',
            fields: ['x', 'y'],
            bins: [10, 5],
        });

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [40, 40, 50, 40],
    });
    chart.data(dv.rows);
    chart.scale({
        y: { nice: true },
        count: { nice: true },
    });
    chart.tooltip({
        showTitle: false,
        showMarkers: false,
    });

    chart.axis('x', {
        grid: {
            line: {
                style: {
                    stroke: '#d9d9d9',
                    lineWidth: 1,
                    lineDash: [2, 2],
                },
            },
        },
    });
    chart.polygon().position('x*y').color('count', Blue5).style({
        lineWidth: 1,
        stroke: '#fff',
    });

    chart.interaction('element-active');

    chart.render();
}

export const MENU1 = '11';
export const MENU2 = '1';
export const TITLE = '六边形分箱';
