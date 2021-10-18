import { Chart } from '@antv/g2';
import data from '../../data/dv-grades.json';

export default function () {
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });
    chart.data(data);

    chart.scale('Score', { nice: true });
    chart.tooltip({
        showCrosshairs: true,
        crosshairs: { type: 'xy' },
    });
    chart.legend({
        reversed: true, //图例项逆序显示
    });
    chart.axis('Score', { grid: null });

    // x轴的栅格线居中
    chart.axis('Class', {
        tickLine: null,
        subTickLine: {
            count: 1,
            length: 4,
            style: {
                lineWidth: 1,
                stroke: '#BFBFBF',
            },
        },
        grid: {
            line: {
                style: {
                    stroke: '#8C8C8C',
                    lineWidth: 1,
                    lineDash: [3, 3],
                },
            },
        },
    });
    chart
        .point()
        .position('Class*Score')
        .color('Grade')
        .adjust('jitter')
        .shape('circle')
        .style({ opacity: 0.65 });

    chart.render();
}

export const MENU1 = '8';
export const MENU2 = '3';
export const TITLE = '扰动点图';
