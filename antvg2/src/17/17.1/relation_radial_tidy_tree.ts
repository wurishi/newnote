import { Chart } from '@antv/g2';
import data from '../../data/flare.json';
import DataSet from '@antv/data-set';

export default function () {
    const dv = new DataSet.View().source(data, {
        type: 'hierarchy',
    });
    dv.transform({
        type: 'hierarchy.tree',
    });

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [50, 0, 20, 0],
    });
    chart.axis(false);
    chart.legend(false);
    chart.coordinate('polar');
    chart.scale({
        x: { nice: true, sync: true },
        y: { nice: true, sync: true },
    });

    const edgeView = chart.createView();
    edgeView.data(
        dv.getAllLinks().map((link) => ({
            x: [link.source.x, link.target.x],
            y: [link.source.y, link.target.y],
            source: link.source.id,
            target: link.target.id,
        }))
    );
    edgeView
        .edge()
        .position('x*y')
        .shape('smooth')
        .color('grey')
        .tooltip('source*target')
        .style({
            strokeOpacity: 0.5,
        });

    const nodeView = chart.createView();
    nodeView.data(
        dv.getAllNodes().map((node) => ({
            hasChildren: !!(node.data.children && node.data.children.length),
            name: node.data.name,
            value: node.value,
            depth: node.depth,
            x: node.x,
            y: node.y,
        }))
    );
    nodeView
        .point()
        .position('x*y')
        .color('hasChildren')
        .label('name', {
            offset: 0,
            labelEmit: true,
            style: {
                fill: 'grey',
                fontSize: 9,
            },
        });

    chart.render();
}

export const MENU1 = '17';
export const MENU2 = '1';
export const TITLE = '径向紧凑树图';
