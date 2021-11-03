import { Chart } from '@antv/g2';
import data from '../../data/diamond.json';
import DataSet from '@antv/data-set';

export default function () {
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [30, 90, 80, 80],
    });
    chart.data(data);

    chart.scale({
        mean: { sync: true },
        cut: { sync: true },
    });

    chart.coordinate('polar');
    chart.axis(false);
    chart.tooltip({
        showMarkers: false,
    });

    chart.facet('circle', {
        fields: ['clarity'],
        eachView(view, facet) {
            const facetData = facet.data;
            const dv = new DataSet.View();
            dv.source(facetData).transform({
                type: 'aggregate',
                fields: ['price'],
                operations: ['mean'],
                as: ['mean'],
                groupBy: ['cut'],
            });

            view.data(dv.rows);
            view.interval().position('cut*mean').color('cut');
            view.interaction('element-active');
        },
    });

    chart.render();
}

export const MENU1 = '16';
export const MENU2 = '1';
export const TITLE = '圆形分面';
