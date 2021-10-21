import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';

export default function () {
    const data = [
        { value: 251, type: '大事例一', name: '子事例一' },
        { value: 1048, type: '大事例一', name: '子事例二' },
        { value: 610, type: '大事例二', name: '子事例三' },
        { value: 434, type: '大事例二', name: '子事例四' },
        { value: 335, type: '大事例三', name: '子事例五' },
        { value: 250, type: '大事例三', name: '子事例六' },
    ];

    const dv = new DataSet().createView();
    dv.source(data).transform({
        type: 'percent',
        field: 'value',
        dimension: 'type',
        as: 'percent',
    });

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: 0,
    });
    chart.data(dv.rows);
    chart.scale({
        percent: {
            formatter: (val) => (+val * 100).toFixed(2) + '%',
        },
    });
    chart.coordinate('theta', { radius: 0.5 });
    chart.tooltip({
        showTitle: false,
        showMarkers: false,
    });
    chart.legend(false);

    chart
        .interval()
        .adjust('stack')
        .position('percent')
        .color('type')
        .label('type', { offset: -10 })
        .tooltip('type*percent', (item, percent) => ({
            name: item,
            value: (+percent * 100).toFixed(2) + '%',
        }))
        .style({
            lineWidth: 1,
            stroke: '#fff',
        });

    const outterView = chart.createView();
    const dv1 = new DataSet.DataView();
    dv1.source(data).transform({
        type: 'percent',
        field: 'value',
        dimension: 'name',
        as: 'percent',
    });

    outterView.data(dv1.rows);
    outterView.scale({
        percent: {
            formatter: (val) => (+val * 100).toFixed(2) + '%',
        },
    });
    outterView.coordinate('theta', {
        innerRadius: 0.5 / 0.75,
        radius: 0.75,
    });
    outterView
        .interval()
        .adjust('stack')
        .position('percent')
        .color('name', [
            '#BAE7FF',
            '#7FC9FE',
            '#71E3E3',
            '#ABF5F5',
            '#8EE0A1',
            '#BAF5C4',
        ])
        .label('name')
        .tooltip('name*percent', (name, percent) => ({
            name,
            value: (+percent * 100).toFixed(2) + '%',
        }))
        .style({
            lineWidth: 1,
            stroke: '#fff',
        });

    chart.interaction('element-highlight');

    chart.render();
}

export const MENU1 = '7';
export const MENU2 = '4';
export const TITLE = '多层饼图';
