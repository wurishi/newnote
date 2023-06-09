import { Chart } from '@antv/g2';

export default function () {
    const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
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
    chart.interaction('brush');
    chart.interval().position('year*value');

    chart.render();
}

export const MENU1 = '2';
export const MENU2 = '3';
export const TITLE = '框选过滤数据';
