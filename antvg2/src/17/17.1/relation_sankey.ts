import { Chart } from '@antv/g2';
import data from '../../data/energy.json';
import DataSet from '@antv/data-set';

export default function () {
    const ds = new DataSet();
    const dv = ds
        .createView()
        .source(data, { type: 'graph', edges: (d) => d.links });
    dv.transform({
        type: 'diagram.sankey',
        sort: (a, b) => {
            if (a.value > b.value) {
                return 0;
            } else if (a.value < b.value) {
                return -1;
            }
            return 0;
        },
    });
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [40, 80],
    });
    chart.legend(false);
    chart.tooltip({
        showTitle: false,
        showMarkers: false,
    });
    chart.axis(false);
    chart.scale({
        x: { sync: true, nice: true },
        y: { sync: true, nice: true },
    });

    const edges = dv.edges.map((edge) => ({
        source: edge.source.name,
        target: edge.target.name,
        x: edge.x,
        y: edge.y,
        value: edge.value,
    }));
    const edgeView = chart.createView();
    edgeView.data(edges);
    edgeView
        .edge()
        .position('x*y')
        .shape('arc')
        .color('#bbb')
        .tooltip('target*source*value', (target, source, value) => ({
            name: source + ' to ' + target + '</span>',
            value,
        }))
        .style({
            fillOpacity: 0.6,
        });

    const nodes = dv.nodes.map((node) => ({
        x: node.x,
        y: node.y,
        name: node.name,
    }));
    const nodeView = chart.createView();
    nodeView.data(nodes);
    nodeView
        .polygon()
        .position('x*y') //nodes数据的 x, y 由 layout 方法计算得出
        .color('name')
        .label('name', {
            style: {
                fill: '#545454',
                textAlign: 'start',
            },
            offset: 0,
            content: (obj) => '  ' + obj.name,
        })
        .tooltip(false)
        .style({
            stroke: '#ccc',
        });

    chart.interaction('element-active');

    chart.render();
}

export const MENU1 = '17';
export const MENU2 = '1';
export const TITLE = '桑基图';
