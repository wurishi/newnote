import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';
import data from '../../data/iris.json';

export default function () {
    const COLOR = ['#1890FF', '#2FC25B', '#FACC14'];

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [16, 16, 48, 48],
    });
    chart.data(data);

    const scale = {};
    [
        'Species',
        'SepalLength',
        'SepalWidth',
        'PetalLength',
        'PetalWidth',
    ].forEach((key) => {
        if (key === 'Species') {
            scale[key] = { sync: true };
        } else {
            scale[key] = { nice: true };
        }
    });
    chart.scale(scale);

    chart.facet('matrix', {
        fields: ['SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth'],
        eachView(view, facet) {
            if (facet.rowIndex === facet.columnIndex) {
                // 对角线的图形，做数据封箱之后绘制图形
                const dv = new DataSet.View();
                dv.source(facet.data).transform({
                    type: 'bin.histogram',
                    field: facet.columnField, // 对应数轴上的一个点
                    bins: 30,
                    as: [facet.columnField, 'count'],
                    groupBy: ['Species'],
                });
                view.data(dv.rows);

                view.interval()
                    .position(facet.columnField + '*count')
                    .color('Species', COLOR)
                    .adjust('stack')
                    .style({ opacity: 0.85 });
            } else {
                view.point()
                    .position([facet.columnField, facet.rowField])
                    .color('Species', COLOR)
                    .shape('circle')
                    .style({ fillOpacity: 0.3, stroke: null })
                    .size(3);
            }
        },
    });

    chart.render();
}

export const MENU1 = '16';
export const MENU2 = '1';
export const TITLE = '散点矩阵';
