import { Chart } from '@antv/g2';

export default function () {
    // 极坐标下的柱状图
    // 构造数据
    const data1 = [];
    for (let i = 0; i < 50; i++) {
        data1.push({
            type: i + '',
            value: 10,
        });
    }

    const data2 = [];
    for (let i = 0; i < 50; i++) {
        const item = {
            type: i + '',
            value: 10,
        };
        if (i === 25) {
            item.value = 14;
        }
        if (i > 25) {
            item.value = 0;
        }
        data2.push(item);
    }

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: 0,
    });
    chart.scale({
        type: { range: [0, 1] },
        value: { sync: true },
    });

    chart.legend(false);
    chart.tooltip(false);

    const view1 = chart.createView();
    view1.data(data1);
    view1.axis(false);
    view1.coordinate('polar', {
        startAngle: (-9 / 8) * Math.PI,
        endAngle: (1 / 8) * Math.PI,
        innerRadius: 0.75,
        radius: 0.8,
    });
    view1.interval().position('type*value').color('#CBCBCB').size(6);
    
    // TODO:

    chart.render();
}

export const MENU1 = '14';
export const MENU2 = '1';
export const TITLE = '刻度仪表盘';
