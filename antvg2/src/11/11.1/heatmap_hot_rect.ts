import { Chart } from '@antv/g2';
import data from '../../data/diamond.json';
import DataSet from '@antv/data-set';
import { Blue10, Blue5 } from '../../utils/theme';

export default function () {
    const dv = new DataSet.DataView();
    dv.source(data).transform({
        type: 'bin.rectangle',
        fields: ['carat', 'price'],
    });
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [20, 20, 50, 80],
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
    chart.polygon().position('x*y').color('count', Blue10);

    chart.interaction('element-active');

    chart.render();
}

export const MENU1 = '11';
export const MENU2 = '1';
export const TITLE = '分块热力图';
