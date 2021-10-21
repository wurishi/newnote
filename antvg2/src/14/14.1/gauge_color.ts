import { Chart } from '@antv/g2';
import {
    drawGauge,
    drawGaugeValue,
    registerGaugePointerShape,
} from '../../utils/gauge';

export default function () {
    function creatData() {
        const data = [];
        const val = (Math.random() * 6).toFixed(1);
        data.push({ value: +val });
        return data;
    }

    registerGaugePointerShape();

    const color = ['#0086FA', '#FFBF00', '#F5222D'];
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [0, 0, 30, 0],
    });
    chart.data(creatData());
    chart.animate(false);

    chart.scale('value', {
        min: 0,
        max: 6,
        tickInterval: 1,
    });

    drawGauge(chart, 'value');

    chart.legend(false);
    chart.tooltip(false);

    chart
        .point()
        .position('value*1')
        .shape('pointer')
        .color('value', (val) => {
            if (val < 2) {
                return color[0];
            } else if (val <= 4) {
                return color[1];
            } else if (val <= 6) {
                return color[2];
            }
        });

    draw(creatData());
    const t = setInterval(() => {
        draw(creatData());
    }, 1000);
    function draw(data: any) {
        const val = data[0].value;
        const lineWidth = 25;
        chart.annotation().clear(true);

        drawGaugeValue(chart, { end: 6, color: '#CBCBCB', lineWidth });

        if (val >= 2) {
            drawGaugeValue(chart, {
                end: val,
                color: color[0],
                lineWidth,
                top: true,
            });
        }

        if (val >= 4) {
            drawGaugeValue(chart, {
                start: 2,
                end: val,
                color: color[1],
                lineWidth,
                top: true,
            });
        }

        if (val > 4 && val <= 6) {
            drawGaugeValue(chart, {
                start: 4,
                end: val,
                color: color[2],
                lineWidth,
                top: true,
            });
        }

        if (val > 2 && val <= 4) {
            drawGaugeValue(chart, {
                start: 2,
                end: val,
                color: color[1],
                lineWidth,
                top: true,
            });
        }

        if (val < 2) {
            drawGaugeValue(chart, {
                end: val,
                color: color[0],
                lineWidth,
                top: true,
            });
        }

        // 绘制指标数字
        chart.annotation().text({
            position: ['50%', '50%'],
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
        chart.changeData(data);
    }

    return () => {
        t && clearInterval(t);
    };
}

export const MENU1 = '14';
export const MENU2 = '1';
export const TITLE = '仪表盘（多色）';
