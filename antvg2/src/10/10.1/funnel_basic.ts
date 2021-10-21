import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';

export default function () {
    const dv = new DataSet.DataView().source([
        { action: '浏览网站', pv: 50000 },
        { action: '放入购物车', pv: 35000 },
        { action: '生成订单', pv: 25000 },
        { action: '支付订单', pv: 15000 },
        { action: '完成交易', pv: 8000 },
    ]);
    dv.transform({
        type: 'map',
        callback: (row) => ({ ...row, percent: row.pv / 50000 }),
    });
    const data = dv.rows;
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [20, 120, 95],
    });
    chart.data(data);
    chart.axis(false);
    chart.tooltip({
        showTitle: false,
        showMarkers: false,
        itemTpl: `
          <li style="margin-bottom:4px;list-style-type:none;padding:0;">
            <span style="background-color:{color};" class="g2-tooltip-marker"></span>
            {name}<br/>
            <span style="padding-left:16px;line-height:16px;">浏览人数：{pv}</span><br/>
            <span style="padding-left:16px;line-height:16px;">占比：{percent}</span><br/>
          </li>
          `,
    });
    chart.coordinate('rect').transpose().scale(1, -1);
    chart
        .interval()
        .adjust('symmetric')
        .position('action*percent')
        .shape('funnel')
        .color('action', [
            '#0050B3',
            '#1890FF',
            '#40A9FF',
            '#69C0FF',
            '#BAE7FF',
        ])
        .label('action*pv', (action, pv) => ({ content: `${action} ${pv}` }), {
            offset: 35,
            labelLine: {
                style: {
                    lineWidth: 1,
                    stroke: 'rgba(0, 0, 0, 0.15)',
                },
            },
        })
        .tooltip('action*pv*percent', (action, pv, percent) => {
            return {
                name: action,
                percent: +percent * 100 + '%',
                pv,
            };
        })
        .animate({
            appear: { animation: 'fade-in' },
            update: { animation: 'fade-in' },
        });

    chart.interaction('element-active');

    chart.on('beforepaint', () => {
        chart.annotation().clear(true);
        const chartData = chart.getData();
        chartData.forEach((obj) => {
            chart.annotation().text({
                top: true,
                position: {
                    action: obj.action,
                    percent: 'center',
                },
                content: +obj.percent * 100 + '%',
                style: {
                    stroke: null,
                    fill: '#fff',
                    textAlign: 'center',
                },
            });
        });
    });

    chart.render();
}

export const MENU1 = '10';
export const MENU2 = '1';
export const TITLE = '基础漏斗图';
