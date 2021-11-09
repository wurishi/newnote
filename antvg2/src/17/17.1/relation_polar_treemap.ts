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
    });

    chart.coordinate('polar').reflect('y'); // 习惯性最小的在最下面
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
        .style({ lineWidth: 1, stroke: '#fff' })
        .label(
            'brand*depth*value',
            (brand, depth, value) => {
                if (depth === 1 && value > 1) {
                    // 只有第一级显示文本，数值太小时不显示文本
                    return {
                        content: brand,
                    };
                }
            },
            {
                offset: 0,
                style: {
                    textBaseline: 'middle',
                    fill: '#000',
                    shadowBlur: 10,
                    shadowColor: '#fff',
                },
                content: (obj) => {
                    if (obj.name !== 'root') return obj.name;
                },
            }
        );
    chart.interaction('element-active');

    chart.render();
}

export const MENU1 = '17';
export const MENU2 = '1';
export const TITLE = '极坐标系下的矩形树图';
