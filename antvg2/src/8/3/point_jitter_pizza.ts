import { Chart } from '@antv/g2';
import data from '../../data/diamond.json';

export default function () {
    data.forEach((obj: any) => (obj.type = '1'));
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [40, 100, 80, 80],
    });
    chart.data(data);

    chart.scale('type', { range: [0, 1] });
    chart.coordinate('polar');
    chart.legend(false);
    chart.axis('clarity', {
        grid: {
            alignTick: false,
            line: {
                style: {
                    lineDash: [0, 0],
                },
            },
        },
    });

    chart
        .point()
        .adjust('jitter')
        .position('clarity*type')
        .color('clarity')
        .shape('circle')
        .style({
            fillOpacity: 0.85,
        });
    chart.render();
}

export const MENU1 = '8';
export const MENU2 = '3';
export const TITLE = 'Pizza Chart';
