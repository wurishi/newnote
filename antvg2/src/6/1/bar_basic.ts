import { Chart } from '@antv/g2';

export default function () {
    const data = [
        { country: '巴西', population: 18203 },
        { country: '印尼', population: 23489 },
        { country: '美国', population: 29034 },
        { country: '印度', population: 104970 },
        { country: '中国', population: 131744 },
    ];

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });

    chart.data(data);
    chart.scale('population', { nice: true });
    chart.coordinate().transpose();
    chart.tooltip({
        showMarkers: false,
    });
    chart.interaction('active-region');
    chart.interval().position('country*population');
    chart.render();
}

export const MENU1 = '6';
export const MENU2 = '1';
export const TITLE = '基础条形图';
