import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';
import data from '../../data/relationship-with-weight.json';

export default function () {
    const colors = [
        '#1890FF',
        '#2FC25B',
        '#FACC14',
        '#223273',
        '#8543E0',
        '#13C2C2',
        '#3436C7',
        '#F04864',
    ];

    const ds = new DataSet();
    const dv = ds.createView().source(data, {
        type: 'graph',
        edges: (d) => d.links,
    });
    dv.transform({
        type: 'diagram.arc',
        marginRatio: 0.5,
    });

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: 50,
    });
    chart.legend(false);
    chart.tooltip({
        showTitle: false,
        showMarkers: false,
    });
    chart.scale({
        x: { nice: true, sync: true },
        y: { nice: true, sync: true },
    });

    const edgeView = chart.createView();
    edgeView.coordinate('polar').reflect('y');
    edgeView.data(dv.edges);
    edgeView.axis(false);
    edgeView
        .edge()
        .position('x*y')
        .shape('arc')
        .color('source', colors)
        .tooltip('source*target')
        .style({
            opacity: 0.3,
        });

    const nodeView = chart.createView();
    nodeView.coordinate('polar').reflect('y');
    nodeView.data(dv.nodes);
    nodeView.axis(false);
    nodeView
        .point()
        .position('x*y')
        .shape('circle')
        .size('value')
        .color('id', colors)
        .style({ stroke: 'grey' })
        .label('name', { labelEmit: true });

    chart.interaction('element-active');

    chart.render();
}

export const MENU1 = '17';
export const MENU2 = '1';
export const TITLE = '极坐标弧长链接图';
