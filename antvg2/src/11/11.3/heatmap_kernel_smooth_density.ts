import { Chart } from '@antv/g2';
import data from '../../data/diamond.json';
import DataSet from '@antv/data-set';

export default function () {
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });

    const dv = new DataSet.View().source(data);
    dv.transform({
        type: 'kernel-smooth.density',
        fields: ['carat', 'price'],
        as: ['carat', 'price', 'density'],
    });

    chart.data(data);

    chart.scale({
        price: { nice: true },
        carat: { nice: true },
        density: { nice: true },
    });

    chart.point().position('carat*price');

    const view = chart.createView({ padding: 0 });
    view.axis(false);
    view.data(dv.rows);
    view.heatmap()
        .position('carat*price')
        .color('density', 'blue-cyan-lime-yellow-red');

    chart.render();
}

export const MENU1 = '11';
export const MENU2 = '3';
export const TITLE = '核函数概率密度分布';
