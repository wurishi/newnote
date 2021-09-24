import { Chart, registerShape, Util } from '@antv/g2';
import DataSet from '@antv/data-set';
import data from '../../data/world-population.json';

export default function () {
    function getTextAttrs(cfg) {
        return {
            ...cfg.defaultStyle,
            ...cfg.style,
            fontSize: cfg.data.size,
            text: cfg.data.text,
            textAlign: 'center',
            fontFamily: cfg.data.font,
            fill: cfg.color || cfg.defaultStyle.stroke,
            textBaseline: 'Alphabetic',
        };
    }

    // 给 point 注册一个词云的 shape
    registerShape('point', 'cloud', {
        draw(cfg, container) {
            const attrs = getTextAttrs(cfg);
            const textShape = container.addShape('text', {
                attrs: {
                    ...attrs,
                    x: cfg.x,
                    y: cfg.y,
                },
            });
            const { rotate } = cfg.data as any;
            if (rotate) {
                Util.rotate(textShape, (rotate * Math.PI) / 180);
            }
            return textShape;
        },
    });

    const dv = new DataSet.View().source(data);
    const range = dv.range('value');
    const [min, max] = range;
    dv.transform({
        type: 'tag-cloud',
        fields: ['x', 'value'],
        size: [600, 500],
        font: 'Verdana',
        padding: 0,
        timeInterval: 5000,
        rotate() {
            let random = ~~(Math.random() * 4) % 4;
            if (random === 2) {
                random = 0;
            }
            return random * 90; // 0, 90, 270
        },
        fontSize(d) {
            if (d.value) {
                return ((d.value - min) / (max - min)) * (80 - 24) + 24;
            }
            return 0;
        },
    });

    const chart = new Chart({
        container: 'chart',
        autoFit: false,
        width: 600,
        height: 500,
        padding: 0,
    });
    chart.data(dv.rows);
    chart.scale({
        x: { nice: false },
        y: { nice: false },
    });
    chart.legend(false);
    chart.axis(false);
    chart.tooltip({
        showTitle: false,
        showMarkers: false,
    });
    chart.coordinate().reflect('y');
    chart
        .point()
        .position('x*y')
        .color('CornflowerBlue')
        .shape('cloud')
        .tooltip('value*category');
    chart.interaction('element-active');
    chart.render();
}

export const MENU1 = '19';
export const MENU2 = '1';
export const TITLE = '词云';
