import { Chart } from '@antv/g2';
import data from '../../data/siteUV.json';
import DataSet from '@antv/data-set';

export default function () {
    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
        type: 'map',
        callback: (row) => {
            const times = row.Time.split(' ');
            row.date = times[0];
            row.time = times[1];
            return row;
        },
    });

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });

    chart.data(dv.rows);
    chart.scale({
        time: { tickCount: 12 },
        date: { type: 'cat' },
        Count: { nice: true },
    });
    chart.axis('Count', {
        label: {
            formatter: (text) => text.replace(/(\d)(?=(?:\d{3})+$)/g, '#1,'),
        },
    });
    chart.tooltip({ showCrosshairs: true });
    chart.line().position('time*Count').color('date', ['#d9d9d9', '#1890ff']);

    chart.annotation().dataMarker({
        position: ['13:00', 0],
        text: {
            content: '服务器宕机\n低值：0',
            style: {
                textAlign: 'left',
            },
        },
        line: {
            length: 30,
        },
    });
    chart.annotation().dataMarker({
        position: ['14:00', 4180],
        text: {
            content: '宕机导致服务积压，恢复后达峰值\n高值：4108',
            style: {
                textAlign: 'left',
            },
        },
        line: {
            length: 20,
        },
    });
    chart.render();
}

export const MENU1 = '18';
export const MENU2 = '1';
export const TITLE = 'DataMarker';
