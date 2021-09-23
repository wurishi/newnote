import { Chart } from '@antv/g2';

export default function () {
    const data = [
        { month: 'Jan', value: 51 },
        { month: 'Feb', value: 91 },
        { month: 'Mar', value: 34 },
        { month: 'Apr', value: 47 },
        { month: 'May', value: 63 },
        { month: 'June', value: 58 },
        { month: 'July', value: 56 },
        { month: 'Aug', value: 77 },
        { month: 'Sep', value: 99 },
        { month: 'Oct', value: 106 },
        { month: 'Nov', value: 88 },
        { month: 'Dec', value: 56 },
    ];

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });

    chart.data(data);

    chart.scale('month', {
        range: [0, 1],
    });
    chart.scale('value', {
        nice: true,
    });

    chart.line().position('month*value').shape('hv');

    chart.render();
}

export const MENU1 = '3';
export const MENU2 = '2';
export const TITLE = '阶梯折线图';
