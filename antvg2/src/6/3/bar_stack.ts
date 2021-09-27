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
        fields: ['小于5岁', '5至13岁', '14至17岁'], // 展开字段集
        key: '年龄段', // key 字段名
        value: '人口数量', // value 字段名
        retains: ['State'], // 保留字段集， 默认为除了 fields 以外的所有字段
    });

    const chart = new Chart({
        container: 'chart',
        height: 500,
        autoFit: true,
    });

    chart.coordinate().transpose();

    chart.data(dv.rows);
    chart.scale('人口数量', { nice: true });

    chart.axis('State', {
        label: { offset: 12 },
    });

    chart.tooltip({
        shared: true,
        showMarkers: false,
    });

    chart.interval().adjust('stack').position('State*人口数量').color('年龄段');

    chart.interaction('active-region');

    chart.render();
}

export const MENU1 = '6';
export const MENU2 = '3';
export const TITLE = '堆叠条形图';
