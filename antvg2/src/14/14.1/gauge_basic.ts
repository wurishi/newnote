import { Chart, registerShape } from '@antv/g2';
import {
    drawGauge,
    drawGaugeValue,
    registerGaugePointerShape,
} from '../../utils/gauge';

export default function () {
    registerGaugePointerShape();

    const data = [{ value: 5.6 }];
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [0, 0, 30, 0],
    });
    chart.data(data);
    chart.scale('value', {
        min: 0,
        max: 9,
        tickInterval: 1,
    });

    drawGauge(chart, 'value');

    chart.legend(false);
    chart
        .point()
        .position('value*1')
        .shape('pointer')
        .color('#1890FF')
        .animate({
            appear: {
                animation: 'fade-in',
            },
        });

    const lineWidth = 18;

    // 绘制仪表盘背景
    drawGaugeValue(chart, {
        end: 9,
        color: '#CBCBCB',
        lineWidth,
    });

    // 绘制指标
    drawGaugeValue(chart, {
        end: data[0].value,
        color: '#1890FF',
        lineWidth,
        top: true,
    });

    // 绘制指标数字
    chart.annotation().text({
        position: ['50%', '85%'],
        content: '合格率',
        style: {
            fontSize: 20,
            fill: '#545454',
            textAlign: 'center',
        },
    });
    chart.annotation().text({
        position: ['50%', '90%'],
        content: `${data[0].value * 10} %`,
        style: {
            fontSize: 36,
            fill: '#545454',
            textAlign: 'center',
        },
        offsetY: 15,
    });

    chart.render();
}

export const MENU1 = '14';
export const MENU2 = '1';
export const TITLE = '仪表盘';
