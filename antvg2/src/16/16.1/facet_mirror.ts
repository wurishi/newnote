import { Chart } from '@antv/g2';
import data from '../../data/population.json';
import DataSet from '@antv/data-set';

export default function () {
    function getData(data: any) {
        const tmp: any[] = [];
        const dates = [];
        data.male.values.forEach((obj) => {
            if (dates.indexOf(obj.date) === -1) {
                dates.push(obj.date);
            }
            obj.age_groups.forEach((subObject) => {
                subObject.gender = 'male';
                subObject.date = obj.date;
                tmp.push(subObject);
            });
        });
        data.female.values.forEach((obj) => {
            obj.age_groups.forEach((subObject) => {
                subObject.gender = 'female';
                subObject.date = obj.date;
                tmp.push(subObject);
            });
        });

        const ds = new DataSet();
        const dv = ds
            .createView()
            .source(tmp)
            .transform({
                type: 'filter',
                callback(row) {
                    return (
                        new Date(row.date * 1000).getFullYear() ===
                        new Date(dates[0] * 1000).getFullYear()
                    );
                },
            });
        return dv.rows;
    }

    const axisHeight = 50;

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [0, 48, 0, 48],
    });

    chart.data(getData(data));
    chart.scale({
        age: { sync: true, tickCount: 11 },
        total_percentage: { sync: true, formatter: (v) => v + '%' },
        gender: { sync: true },
    });

    chart.facet('mirror', {
        fields: ['gender'],
        transpose: false,
        padding: [axisHeight / 2, 0, axisHeight / 2, 0],
        eachView(view) {
            view.interval()
                .position('age*total_percentage')
                .color('gender', ['#1890ff', '#f04864']);
        },
    });

    chart.on('afterrender', () => {
        const view = chart.views[0];
        const { height: rHeight } = chart.viewBBox;
        const { height: vHeight } = view.viewBBox;
        view.axis('age', {
            position: 'bottom',
            label: {
                style: {
                    textAlign: 'center',
                    textBaseline: 'middle',
                },
                offset: rHeight / 2 - vHeight + axisHeight / 2,
            },
            tickLine: null,
        });
        view.render();
    });

    chart.render();
}

export const MENU1 = '16';
export const MENU2 = '1';
export const TITLE = '镜像分面';
