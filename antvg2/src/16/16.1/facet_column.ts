import { Chart } from '@antv/g2';
import data from '../../data/diamond.json';

export default function () {
    const chart = new Chart({
        container: 'chart',
        height: 500,
        autoFit: true,
        padding: [32, 8, 48, 48],
    });
    chart.data(data);

    chart.scale({
        carat: { sync: true },
        price: { sync: true },
        clarity: { sync: true },
    });

    chart.facet('rect', {
        fields: ['cut'],
        eachView(view) {
            view.point()
                .position('carat*price')
                .color('clarity')
                .shape('circle')
                .style({ fillOpacity: 0.3, stroke: null })
                .size(3);
        },
    });

    chart.render();
}

export const MENU1 = '16';
export const MENU2 = '1';
export const TITLE = '列分面';
