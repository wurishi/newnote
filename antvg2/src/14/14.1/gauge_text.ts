import { Chart } from '@antv/g2';
import {
    drawGauge,
    drawGaugeValue,
    registerGaugePointerShape,
} from '../../utils/gauge';

export default function () {
    registerGaugePointerShape();

    const data = [{ value: 6 }];
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [0, 0, 30, 0],
    });
    chart.data(data);

    drawGauge(chart, 'value', {
        labelFormatter(val) {
            if (val === '2.25') return '差';
            if (val === '3.75') return '中';
            if (val === '5.25') return '良';
            return '优';
        },
        tickLine: null,
    });

    chart.scale('value', { min: 0, max: 9, ticks: [2.25, 3.75, 5.25, 6.75] });

    chart.legend(false);
    chart.point().position('value*1').shape('pointer').color('#1890FF');

    // 绘制仪表盘刻度线
    chart.annotation().line({
        start: [3, 0.905],
        end: [3.0035, 0.85],
        style: {
            stroke: '#19AFFA',
            lineDash: null,
            lineWidth: 3,
        },
    });
    chart.annotation().line({
        start: [4.5, 0.905],
        end: [4.5, 0.85],
        style: {
            stroke: '#19AFFA', // 线的颜色
            lineDash: null, // 虚线的设置
            lineWidth: 3,
        },
    });

    chart.annotation().line({
        start: [6, 0.905],
        end: [6.0035, 0.85],
        style: {
            stroke: '#19AFFA', // 线的颜色
            lineDash: null, // 虚线的设置
            lineWidth: 3,
        },
    });

    drawGaugeValue(chart, {
        end: 9,
        color: '#CBCBCB',
        lineWidth: 18,
    });
    drawGaugeValue(chart, {
        end: data[0].value,
        color: '#1890FF',
        lineWidth: 20,
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
export const TITLE = '仪表盘（文字）';
