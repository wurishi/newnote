import { Chart, registerShape } from '@antv/g2';

export function registerGaugePointerShape() {
    registerShape('point', 'pointer', {
        draw(cfg, container) {
            const group = container.addGroup();
            const center = this.parsePoint({ x: 0, y: 0 });
            // 绘制指针
            group.addShape('line', {
                attrs: {
                    x1: center.x,
                    y1: center.y,
                    x2: cfg.x,
                    y2: cfg.y,
                    stroke: cfg.color,
                    lineWidth: 5,
                    lineCap: 'round',
                },
            });
            group.addShape('circle', {
                attrs: {
                    x: center.x,
                    y: center.y,
                    r: 9.75,
                    stroke: cfg.color,
                    lineWidth: 4.5,
                    fill: '#fff',
                },
            });
            return group;
        },
    });
}

interface iDrawGaugeParams {
    labelFormatter?: any;
    tickLine?: any;
}

export function drawGauge(
    chart: Chart,
    axisValue: string,
    params?: iDrawGaugeParams
) {
    let {
        labelFormatter,
        tickLine = {
            length: -24,
        },
    } = params || {};
    chart.axis('1', false);
    chart.axis(axisValue, {
        line: null,
        tickLine,
        grid: null,
        label: {
            offset: -36,
            style: {
                fontSize: 18,
                fill: '#CBCBCB',
                textAlign: 'center',
                textBaseline: 'middle',
            },
            formatter: labelFormatter,
        },
    });

    chart.coordinate('polar', {
        startAngle: (-9 / 8) * Math.PI,
        endAngle: (1 / 8) * Math.PI,
        radius: 0.75,
    });
}

interface iDrawGaugeValueParams {
    start?: number;
    end: number;
    color: string;
    top?: boolean;
    lineWidth: number;
}

export function drawGaugeValue(chart: Chart, params: iDrawGaugeValueParams) {
    const { start = 0, end, color, top = false, lineWidth } = params;
    chart.annotation().arc({
        top,
        start: [start, 1],
        end: [end, 1],
        style: {
            stroke: color,
            lineWidth,
            lineDash: null,
        },
    });
}
