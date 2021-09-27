import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';

export default function () {
    const data = [
        { State: 'WY', 小于5岁: 25635, '5至13岁': 1890, '14至17岁': 9314 },
        { State: 'DC', 小于5岁: 30352, '5至13岁': 20439, '14至17岁': 10225 },
        { State: 'VT', 小于5岁: 38253, '5至13岁': 42538, '14至17岁': 15757 },
        { State: 'ND', 小于5岁: 51896, '5至13岁': 67358, '14至17岁': 18794 },
        { State: 'AK', 小于5岁: 72083, '5至13岁': 85640, '14至17岁': 22153 },
    ];

    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
        type: 'fold',
        fields: ['小于5岁', '5至13岁', '14至17岁'],
        key: '年龄段',
        value: '人口数量',
        retains: ['State'],
    });

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });

    chart.coordinate('polar').transpose();

    chart.data(dv.rows);
    chart.scale('人口数量', {
        max: 200000,
        tickCount: 10,
    });

    chart.axis('State', {
        label: {
            offset: 12,
        },
        tickLine: {
            alignTick: false,
        },
        grid: null,
        line: {
            style: {
                stroke: '#595959',
            },
        },
    });

    chart.axis('人口数量', {
        grid: {
            line: {
                style: {
                    lineDash: [4, 4],
                },
            },
        },
    });

    chart.tooltip({
        shared: true,
        showMarkers: false,
    });

    chart.legend({
        marker: {
            symbol: 'square',
            style: { r: 5 },
        },
    });

    chart.interval().adjust('stack').position('State*人口数量').color('年龄段');

    chart.interaction('element-highlight-by-x');

    chart.render();
}

export const MENU1 = '6';
export const MENU2 = '3';
export const TITLE = '径向堆叠条形图';
