import { Chart, registerShape } from '@antv/g2';
import ie from '../../assets/img_ie.png';
import chrome from '../../assets/img_chrome.png';
import firefox from '../../assets/img_firefox.png';
import opera from '../../assets/img_opera.png';
import safari from '../../assets/img_safari.png';
import un from '../../assets/img_u.png';

export default function () {
    registerShape('point', 'image', {
        draw(cfg, container) {
            cfg.points = this.parsePoints(cfg.points);
            const coord = this.coordinate;
            container.addShape('line', {
                attrs: {
                    x1: cfg.points[0].x,
                    y1: cfg.points[0].y,
                    x2: cfg.points[0].x,
                    y2: coord.start.y,
                    stroke: '#ccc',
                    lineWidth: 1,
                    lineDash: [4, 2],
                },
            });

            return container.addShape('image', {
                attrs: {
                    x: cfg.points[0].x - (12 * cfg.size) / 2,
                    y: cfg.points[0].y - 12 * cfg.size,
                    width: 12 * cfg.size,
                    height: 12 * cfg.size,
                    img: cfg.shape[1],
                },
            });
        },
    });

    const data = [
        { name: 'Internet Explorer', value: 26 },
        { name: 'Chrome', value: 40 },
        { name: 'Firefox', value: 30 },
        { name: 'Safari', value: 24 },
        { name: 'Opera', value: 15 },
        { name: 'Undetectable', value: 8 },
    ];

    const imageMap = {
        'Internet Explorer': ie,
        Chrome: chrome,
        Firefox: firefox,
        Safari: safari,
        Opera: opera,
        Undetectable: un,
    };

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });
    chart.data(data);

    chart.scale('value', {
        nice: false,
        max: 60,
        min: 0,
    });
    chart.legend(false);
    chart.axis('value', false);
    chart.tooltip({
        showMarkers: false,
    });
    chart
        .point()
        .position('name*value')
        .size('value')
        .color('name')
        .shape('name', (name) => {
            return ['image', imageMap[name]];
        })
        .label('value', {
            offset: -20,
            style: {
                fontSize: 16,
            },
        });

    chart.render();
}

export const MENU1 = '8';
export const MENU2 = '2';
export const TITLE = '气泡图 - 自定义 shape';
