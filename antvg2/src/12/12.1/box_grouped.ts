import { Chart } from '@antv/g2';
import data from '../../data/iris.json';
import DataSet from '@antv/data-set';

export default function () {
    const dv = new DataSet.DataView().source(data);
    dv.transform({
        type: 'fold',
        fields: ['SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth'],
        key: 'type',
        value: 'value',
    }).transform({
        type: 'bin.quantile',
        field: 'value', // 计算分为值的字段
        as: '_bin', // 保存分为值的数组字段名
        groupBy: ['Species', 'type'],
    });

    const colorMap = {
        'I. setosa': '#5B8FF9',
        'I. versicolor': '#5AD8A6',
        'I. virginica': '#5D7092',
    };

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });
    chart.data(dv.rows);
    chart.scale('_bin', { nice: true });
    chart.tooltip({
        showMarkers: false,
        shared: true,
    });

    chart
        .schema()
        .position('type*_bin')
        .color('Species', (val) => colorMap[val])
        .shape('box')
        .style('Species', (val) => ({
            stroke: '#545454',
            fill: colorMap[val],
            fillOpacity: 0.3,
        }))
        .adjust('dodge');

    chart.interaction('active-region');

    chart.render();
}

export const MENU1 = '12';
export const MENU2 = '1';
export const TITLE = '分组箱型图';
