import { Chart } from '@antv/g2';
import green from '../../assets/texture_green.jpeg';
import pink from '../../assets/texture_pink.jpeg';

export default function () {
    const data = [
        { sex: '男', sold: 0.45 },
        { sex: '女', sold: 0.55 },
    ];

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });

    chart.data(data);
    chart.coordinate('theta', { radius: 0.8 });
    chart.tooltip({
        showTitle: false,
        showMarkers: false,
    });
    chart.legend(false);

    chart
        .interval()
        .adjust('stack')
        .position('sold')
        .label('sex')
        .color('sex', (sex) => {
            return (sex === '男' ? 'green' : 'pink');
        })
        .style('sex', (sex) => {
            return {
                fill: 'p(a)' + (sex === '男' ? green : pink),
            };
        });

    chart.render();
}

export const MENU1 = '7';
export const MENU2 = '1';
export const TITLE = '饼图 - 带纹理';
