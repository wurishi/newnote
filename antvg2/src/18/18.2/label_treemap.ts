import { Chart } from '@antv/g2';
import mobiles from '../../data/mobile.json';
import DataSet from '@antv/data-set';

export default function () {
    const { DataView } = DataSet;
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

    const nodes = [];
    for (const node of dv.getAllNodes()) {
        if (!node.children || node.children.length > 1) {
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
        localRefresh: false,
    });
    chart.coordinate().scale(1, -1);
    chart.data(nodes);
    chart.axis(false);
    chart.legend(false);
    chart.tooltip(false);
    chart
        .polygon()
        .position('x*y')
        .color('brand')
        .style({
            lineWidth: 0.5,
            stroke: 'rgba(255, 255, 255, 0.65)',
        })
        .tooltip('name*brand*value')
        .label(
            'brand*depth*name',
            (brand, depth, name) => {
                if (depth > 1 || name === '其他') {
                    // 只有第一级显示文本
                    return {
                        content: name,
                        style: {
                            shadowColor: 'rgba(0, 0, 0, .5)',
                            shadowBlur: 5,
                        },
                        offset: 0,
                    };
                }
                return null;
            },
            { layout: { type: 'limit-in-shape' } }
        );

    chart.render();
}

export const MENU1 = '18';
export const MENU2 = '2';
export const TITLE = '矩形树图文本';
