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

    chart.tooltip({
        showTitle: false,
        showCrosshairs: true,
        crosshairs: {
            type: 'xy',
        },
        itemTpl: `
        <li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;">
        {name}<br/>
        {value}
        </li>
        `,
    });

    chart
        .point()
        .position('height*weight')
        .color('gender')
        .shape('circle')
        .tooltip('gender*height*weight', (gender, height, weight) => ({
            name: gender,
            value: height + '(cm), ' + weight + '(kg)',
        }))
        .style({ fillOpacity: 0.85 });

    chart.interaction('legend-highlight');
    chart.render();
}

export const MENU1 = '8';
export const MENU2 = '1';
export const TITLE = '散点图';
