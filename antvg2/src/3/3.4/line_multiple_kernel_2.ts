import { Chart } from '@antv/g2';
import diamond from '../../data/diamond.json';
import DataSet from '@antv/data-set';

export default function () {
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });

    chart.data(diamond);
    chart.scale({
        carat: {
            alias: '克拉数',
            min: 0,
            max: 4,
            sync: true,
        },
        price: {
            alias: '价格',
            sync: true,
            nice: true,
        },
    });

    chart.point().position('carat*price').shape('circle');

    [
        'boxcar',
        'cosine',
        'epanechnikov',
        'gaussian',
        'quartic',
        'triangular',
        'tricube',
        'triweight',
        'uniform',
    ].forEach((method: any, i) => {
        const dv = new DataSet.View().source(diamond);
        dv.transform({
            type: 'kernel-smooth.regression',
            method,
            fields: ['carat', 'price'],
            as: ['carat', 'price'],
            bandwidth: 0.5,
            extent: [0, 4],
        });

        const view = chart.createView();
        view.data(dv.rows);
        view.axis(false);
        view.line().position('carat*price').color(view.getTheme().colors20[i]);
    });

    chart.render();
}

export const MENU1 = '3';
export const MENU2 = '4';
export const TITLE = '核函数概率密度回归曲线（两字段）';
