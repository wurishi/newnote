import { Chart, getTheme } from '@antv/g2';
import { Blue5 } from '../../utils/theme';

export default function () {
    const data = [
        { action: '浏览网站', pv: 50000 },
        { action: '放入购物车', pv: 35000 },
        { action: '生成订单', pv: 25000 },
        { action: '支付订单', pv: 15000 },
        { action: '完成交易', pv: 8000 },
    ];

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [20, 120, 95],
    });
    chart.data(data);

    chart.axis(false);

    chart.coordinate('rect').transpose().scale(1, -1);

    chart.tooltip({ showMarkers: false });

    chart
        .interval()
        .adjust('symmetric')
        .position('action*pv')
        .shape('pyramid')
        .color('action', Blue5.reverse())
        .label('action*pv', (action, pv) => ({ content: `${action} ${pv}` }), {
            offset: 35,
            labelLine: {
                style: {
                    lineWidth: 1,
                    stroke: 'rgba(0, 0, 0, 0.15)',
                },
            },
        })
        .animate({
            appear: { animation: 'fade-in' },
            update: { animation: 'fade-in' },
        });

    chart.interaction('element-active');

    chart.render();
}

export const MENU1 = '10';
export const MENU2 = '1';
export const TITLE = '尖底漏斗图';
