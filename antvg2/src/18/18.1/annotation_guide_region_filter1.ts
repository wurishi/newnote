import { Chart } from '@antv/g2';
import data from '../../data/tempChange.json';

export default function () {
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });
    chart.data(data);
    chart.area().position('year*change').color('white').shape('smooth');
    chart.line().position('year*change').color('white').shape('smooth');
    chart.annotation().regionFilter({
        top: true,
        start: ['min', 0],
        end: ['max', 'min'],
        color: '#18a1cd',
    });
    chart.annotation().regionFilter({
        top: true,
        start: ['min', 'max'],
        end: ['max', 0],
        color: '#FF4D4F',
    });
    chart.annotation().region({
        top: false,
        start: [2000, 'max'],
        end: [2016, 'min'],
    });
    chart.annotation().dataMarker({
        top: true,
        position: [1977, 0.18],
        text: {
            content: '时间进入1977年后，全球气\n温开始呈现整体升高趋势。',
            style: { textAlign: 'right', fontSize: 13 },
        },
        line: {
            length: 50,
        },
        point: {
            style: {
                stroke: '#FF4D4F',
            },
        },
    });
    chart.annotation().dataMarker({
        top: true,
        position: [1940, 0.08],
        text: {
            content: '1940年，气温变化首次出现正值。',
            style: {
                textAlign: 'right',
                fontSize: 13,
            },
        },
        line: {
            length: 50,
        },
        point: {
            style: { stroke: '#FF4D4F' },
        },
    });

    chart.render();
}

export const MENU1 = '18';
export const MENU2 = '1';
export const TITLE = 'RegionFilter1';
