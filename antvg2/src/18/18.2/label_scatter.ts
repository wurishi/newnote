import { Chart } from '@antv/g2';
import data from '../../data/scatter.json';

export default function () {
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });
    chart.data(data);
    chart.scale({
        height: { nice: true },
        weight: { nice: true },
    });
    chart.tooltip(false);

    chart
        .point()
        .position('height*weight')
        .size(4)
        .shape('circle')
        .label('weight', {
            layout: { type: 'overlap' },
            offset: 0,
            style: {
                fill: 'rgba(0, 0, 0, .65)',
                stroke: '#fff',
                lineWidth: 2,
            },
        });

    chart.render();
}

export const MENU1 = '18';
export const MENU2 = '2';
export const TITLE = '散点图文本';
