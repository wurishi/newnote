import { Chart } from '@antv/g2';
import data from '../../data/diamond.json';

export default function () {
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: 48,
    });
    chart.data(data);

    chart.scale({
        carat: { sync: true },
        price: { sync: true },
        cut: { sync: true },
    });

    chart.facet('list', {
        fields: ['cut'],
        cols: 3, // 超过3个换行
        padding: 30,
        eachView(view) {
            view.point()
                .position('carat*price')
                .color('cut')
                .shape('circle')
                .style({
                    fillOpacity: 0.3,
                    stroke: null,
                })
                .size(3);
        },
    });

    chart.render();
}

export const MENU1 = '16';
export const MENU2 = '1';
export const TITLE = 'List 分面';
