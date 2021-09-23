import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';
import * as _ from 'lodash';
import diamond from '../../data/diamond.json';

const methods = [
    'boxcar',
    'cosine',
    'epanechnikov',
    'gaussian',
    'quartic',
    'triangular',
    'tricube',
    'triweight',
    'uniform',
];

export default function () {
    function getStaticsData(data) {
        const result = methods.map((method: any) => {
            const dv = new DataSet.View().source(data);
            dv.transform({
                type: 'kernel-smooth.regression',
                as: ['x', method],
                method,
                field: 'depth',
                extent: [50, 70],
            });
            return dv.rows;
        });
        return _.zipWith(...result, (...args) => {
            return _.assign({}, ...args);
        });
    }

    const statics = getStaticsData(diamond);

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });

    chart.data(statics);

    chart.scale({
        x: {
            alias: 'depth',
            min: 50,
            max: 70,
            sync: true,
        },
        y: {
            alias: '概率密度分布',
            sync: true,
        },
    });

    methods.forEach((method, i) => {
        if (i) {
            chart.axis(method, false);
        }
        chart.tooltip({
            showCrosshairs: true,
            shared: true,
        });
        chart
            .line()
            .position(`x*${method}`)
            .color(chart.getTheme().colors20[i]);
    });

    chart.render();
}

export const MENU1 = '3';
export const MENU2 = '4';
export const TITLE = '核函数概率密度回归曲线';
