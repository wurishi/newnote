import { Chart, Util, registerShape } from '@antv/g2';
import DataSet from '@antv/data-set';
import data from '../../data/antv-keywords.json';
import image from '../../assets/mask.png?url';

export default function () {
    function getTextAttrs(cfg) {
        return {
            ...cfg.style,
            fontSize: cfg.data.size,
            text: cfg.data.text,
            textAlign: 'center',
            fontFamily: cfg.data.font,
            fill: cfg.color,
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
    const imageMask = new Image();
    imageMask.crossOrigin = '';
    imageMask.src = image;
    imageMask.onload = () => {
        dv.transform({
            type: 'tag-cloud',
            fields: ['name', 'value'],
            imageMask,
            font: 'Verdana',
            size: [600, 400], // 宽高设置最好根据 imageMask 做调整
            padding: 0,
            timeInterval: 5000, // max execute time
            rotate() {
                let random = ~~(Math.random() * 4) % 4;
                if (random === 2) {
                    random = 0;
                }
                return random * 90; // 0, 90, 270
            },
            fontSize(d) {
                return ((d.value - min) / (max - min)) * (32 - 8) + 8;
            },
        });

        const chart = new Chart({
            container: 'chart',
            autoFit: false,
            width: 600, // 宽高设置最好根据 imageMask 做调整
            height: 400,
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
            .color('text')
            .shape('cloud')
            .state({
                active: {
                    style: { fillOpacity: 0.4 },
                },
            });
        chart.interaction('element-active');
        chart.render();
    };
}

export const MENU1 = '19';
export const MENU2 = '1';
export const TITLE = '带图片遮罩的词云';
