import { Chart } from '@antv/g2';
import data from '../../data/scatter.json';

export default function () {
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [50, 70],
        localRefresh: false,
    });
    chart.data(data);
    chart.scale({
        height: { nice: true },
        weight: { nice: true },
    });
    chart.tooltip({
        showContent: false,
        showCrosshairs: true,
        crosshairs: {
            type: 'xy',
            text: (type, defaultText, items) => {
                const color = items[0].color;
                if (type === 'x') {
                    return {
                        offset: 5,
                        position: 'end',
                        content: defaultText + ' cm',
                        style: {
                            textAlign: 'center',
                            textBaseline: 'top',
                            fill: color,
                            fontSize: 14,
                            fontWeight: 'bold',
                            stroke: '#333',
                            lineWidth: 2,
                        },
                    };
                }
                return {
                    offset: 5,
                    content: defaultText + ' kg',
                    style: {
                        textAlign: 'end',
                        fill: color,
                        fontSize: 14,
                        fontWeight: 'bold',
                        stroke: '#333',
                        lineWidth: 2,
                    },
                };
            },
            textBackground: null,
        },
        itemTpl:
            '<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;">' +
            '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
            '{name}<br/>' +
            '{value}' +
            '</li>',
    });

    chart
        .point()
        .position('height*weight')
        .color('gender')
        .shape('circle')
        .tooltip('gender*height*weight', (gender, height, weight) => {
            return {
                name: gender,
                value: height + '(cm), ' + weight + '(kg)',
            };
        })
        .style({
            opacity: 0.85,
        });

    chart.render();
}

export const MENU1 = '18';
export const MENU2 = '3';
export const TITLE = 'xy crosshairs, 带文本';
