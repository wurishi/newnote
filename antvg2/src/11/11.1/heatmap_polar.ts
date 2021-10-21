import { Chart } from '@antv/g2';
import data from '../../data/polar-heatmap.json';
import { Blue5 } from '../../utils/theme';

export default function () {
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: 40,
    });
    chart.data(data);
    chart.tooltip({
        showTitle: null,
        showMarkers: false,
    });
    chart.coordinate('polar', { innerRadius: 0.2 });
    chart.axis('week', { grid: null, line: null, tickLine: null, label: null });
    chart.axis('time', {
        line: null,
        tickLine: null,
        grid: null,
        label: { offset: 3 },
    });
    chart
        .polygon()
        .position('time*week')
        .color('value', Blue5)
        .tooltip('week*time*value')
        .style({
            stroke: '#fff',
            lineWidth: 1,
        });
    chart.interaction('element-active');

    const values = ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'];
    values.forEach((val, idx) => {
        chart.annotation().text({
            top: true,
            position: [0, idx],
            content: val,
            style: {
                fill: '#fff',
                textAlign: 'center',
                shadowBlur: 2,
                shadowColor: 'rgba(0, 0, 0, .45)',
            },
        });
    });

    chart.render();
}

export const MENU1 = '11';
export const MENU2 = '1';
export const TITLE = '极坐标下的色块图';
