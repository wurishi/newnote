import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';
import data from '../../data/population.json';

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

    const axisWidth = 50;

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [32, 16, 48, 16],
    });
    chart.data(getData(data));
    chart.scale({
        age: { sync: true, tickCount: 11 },
        total_percentage: { sync: true, formatter: (v) => v + '%' },
        gender: { sync: true },
    });

    chart.facet('mirror', {
        fields: ['gender'],
        transpose: true,
        padding: [0, axisWidth / 2, 0, axisWidth / 2],
        eachView(view) {
            view.interval()
                .position('age*total_percentage')
                .color('gender', ['#1890ff', '#f04864']);
        },
    });

    chart.on('afterrender', () => {
        const { width: rWidth, x: rX } = chart.viewBBox;
        const view = chart.views[0];
        const { width: vWidth, x: vX } = view.viewBBox;
        view.axis('age', {
            label: {
                style: {
                    textAlign: 'center',
                },
                offset: rWidth / 2 - vWidth - rX - vX + axisWidth / 2,
            },
            tickLine: null,
        });
        view.render();
    });

    chart.render();
}

export const MENU1 = '16';
export const MENU2 = '1';
export const TITLE = '镜像分面 (transpose)';
