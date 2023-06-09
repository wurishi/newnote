import { Chart } from '@antv/g2';

export default function () {
    const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
    ];

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });
    chart.data(data);

    chart.tooltip({
        showMarkers: false,
    });

    chart.interval().position('year*value').color('year');

    chart.interaction('element-highlight');
    chart.interaction('element-list-highlight');
    chart.interaction('legend-highlight');
    chart.interaction('axis-label-highlight');

    chart.render();
}

export const MENU1 = '2';
export const MENU2 = '1';
export const TITLE = '组合交互';
