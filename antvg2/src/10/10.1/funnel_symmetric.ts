import { Chart, getTheme } from '@antv/g2';
import { Blue10, Blue5 } from '../../utils/theme';

export default function () {
    const data = [
        { action: '访问', visitor: 500, site: '站点1' },
        { action: '浏览', visitor: 400, site: '站点1' },
        { action: '交互', visitor: 300, site: '站点1' },
        { action: '下单', visitor: 200, site: '站点1' },
        { action: '完成', visitor: 100, site: '站点1' },
        { action: '访问', visitor: 550, site: '站点2' },
        { action: '浏览', visitor: 420, site: '站点2' },
        { action: '交互', visitor: 280, site: '站点2' },
        { action: '下单', visitor: 150, site: '站点2' },
        { action: '完成', visitor: 80, site: '站点2' },
    ];

    data.sort((obj1, obj2) => obj1.visitor - obj2.visitor);

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [30, 120, 95],
    });
    chart.data(data);
    chart.axis(false);
    chart.tooltip({
        showMarkers: false,
        showTitle: false,
        itemTpl:
            '<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;">' +
            '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
            '{name}<br/>' +
            '<span style="padding-left: 16px">{value}</span>' +
            '</li>',
    });

    chart.facet('mirror', {
        fields: ['site'],
        transpose: true,
        padding: 0,
        eachView(view, facet) {
            view.interval()
                .position('action*visitor')
                .color('action', Blue5)
                .shape('funnel')
                .tooltip('site*action*visitor', (site, action, visitor) => ({
                    name: site,
                    value: action + ': ' + visitor,
                }))
                .style({
                    lineWidth: 1,
                    stroke: '#fff',
                })
                .animate({
                    appear: { animation: 'fade-in' },
                    update: { animation: 'fase-in' },
                });

            data.forEach((obj) => {
                if (obj.site === facet.columnValue) {
                    view.annotation().text({
                        top: true,
                        position: [obj.action, 'min'],
                        content: obj.visitor,
                        style: {
                            fill: '#fff',
                            stroke: null,
                            fontSize: 12,
                            textAlign: facet.columnIndex ? 'start' : 'end',
                            shadowBlur: 2,
                            shadowColor: 'rgba(0, 0, 0, 0.45)',
                        },
                        offsetX: facet.columnIndex ? 10 : -10,
                    });
                }
            });
        },
    });

    chart.interaction('element-active');
    chart.removeInteraction('legend-filter');
    chart.render();
}

export const MENU1 = '10';
export const MENU2 = '1';
export const TITLE = '对称漏斗图';
