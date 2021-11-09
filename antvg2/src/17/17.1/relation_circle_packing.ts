import { Chart } from '@antv/g2';
import data from '../../data/flare.json';
import DataSet from '@antv/data-set';

export default function () {
    const dv = new DataSet.View().source(data, { type: 'hierarchy' });
    dv.transform({ type: 'hierarchy.circle-packing' });
    const diameter = Math.min(window.innerWidth, 500);

    const chart = new Chart({
        container: 'chart',
        width: diameter,
        height: diameter,
        padding: 0,
    });
    chart.axis(false);
    chart.legend(false);
    chart.tooltip({ showTitle: false, showMarkers: false });

    const nodes = dv.getAllNodes().map((node) => ({
        hasChildren: !!(node.data.children && node.data.children.length),
        name: node.data.name.split(/(?=[A-Z][^A-Z])/g).join('\n'),
        value: node.value,
        depth: node.depth,
        x: node.x,
        y: node.y,
        r: node.r,
    }));

    chart.data(nodes);
    chart.scale({
        x: { nice: true },
        y: { nice: true },
    });
    chart
        .point()
        .position('x*y')
        .color('hasChildren')
        .shape('circle')
        .tooltip('name')
        .size('r', (r) => r * diameter)
        .color('r', 'rgb(252, 253, 191)-rgb(231, 82, 99)-rgb(183, 55, 121)')
        .style({ stroke: 'rgb(183, 55, 121)' })
        .label('name', {
            offset: 0,
            style: {
                textBaseline: 'middle',
                fill: 'grey',
                fontSize: 9,
                textAlign: 'center',
            },
            layout: {
                type: 'fixed-overlap',
            },
        });

    chart.interaction('element-active');

    chart.render();
}

export const MENU1 = '17';
export const MENU2 = '1';
export const TITLE = 'Circle Packing';
