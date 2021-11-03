import { Chart } from '@antv/g2';
import data from '../../data/diamond.json';
import DataSet from '@antv/data-set';

export default function () {
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [20, 80],
    });
    chart.data(data);
    chart.scale({
        cut: { sync: true },
        mean: { sync: true, tickCount: 5 },
    });
    chart.legend('cut', { position: 'top' });
    chart.axis('cut', {
        label: null,
        tickLine: null,
    });
    chart.facet('tree', {
        fields: ['clarity'],
        line: {
            style: {
                stroke: '#00a3d7',
            },
            smooth: true,
        },
        // padding: 0,
        eachView(view, facet) {
            const dv = new DataSet.View();
            dv.source(facet.data).transform({
                type: 'aggregate',
                fields: ['price'],
                operations: ['mean'],
                as: ['mean'],
                groupBy: ['cut'],
            });
            view.data(dv.rows);
            view.interval().position('cut*mean').color('cut');
        },
    });

    chart.render();
}

export const MENU1 = '16';
export const MENU2 = '1';
export const TITLE = 'tree 分面';
