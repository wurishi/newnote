import { Chart } from '@antv/g2';
import mobiles from '../../data/mobile.json';
import DataSet from '@antv/data-set';

export default function () {
    const { DataView } = DataSet;
    // 会通过子节点累加 value 值，所以设置为 0
    mobiles.forEach((mobile) => (mobile.value = null));

    const data = {
        name: 'root',
        children: mobiles,
    };
    const dv = new DataView();
    dv.source(data, { type: 'hierarchy' }).transform({
        field: 'value',
        type: 'hierarchy.treemap',
        tile: 'treemapResquarify',
        as: ['x', 'y'],
    });

    // 将 DataSet 处理后的结果转换为 G2 接受的数据
    const nodes = [];
    for (const node of dv.getAllNodes()) {
        if (!node.children) {
            const eachNode = {
                name: node.data.name,
                x: node.x,
                y: node.y,
                depth: node.depth,
                value: node.value,
                brand: '',
            };
            if (!node.data.brand && node.parent) {
                eachNode.brand = node.parent.data.brand;
            } else {
                eachNode.brand = node.data.brand;
            }
            nodes.push(eachNode);
        }
    }
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: 0,
    });
    chart.coordinate().scale(1, -1); // 习惯性最小的在最下面
    chart.data(nodes);
    chart.axis(false);
    chart.legend(false);
    chart.tooltip({
        showTitle: false,
        showMarkers: false,
    });
    chart
        .polygon()
        .position('x*y')
        .color('brand')
        .tooltip('name*value', (name, value) => ({ name, value }))
        .style({
            lineWidth: 1,
            stroke: '#fff',
        })
        .label('name', {
            offset: 0,
            style: {
                textBaseline: 'middle',
                fill: '#000',
                shadowBlur: 10,
                shadowColor: '#fff',
            },
            layout: {
                type: 'limit-in-shape',
            },
        });
    chart.interaction('element-active');
    chart.render();
}

export const MENU1 = '17';
export const MENU2 = '1';
export const TITLE = 'Treemap-Children';
