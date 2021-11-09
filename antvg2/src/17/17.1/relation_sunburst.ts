import { Chart } from '@antv/g2';
import data from '../../data/sunburst.json';
import DataSet from '@antv/data-set';
import { Blue10, Blue5, GeekBlue10, Yellow10 } from '../../utils/theme';

export default function () {
    const dv = new DataSet.View();
    dv.source(data, { type: 'hierarchy' }).transform({
        type: 'hierarchy.partition', // 根据树形状数据生成相邻层次图 Adjacency Diagrm 布局
        field: 'sum',
        as: ['x', 'y'],
    });
    const source = [];
    const nodes = dv.getAllNodes();
    nodes.map((node) => {
        if (node.depth === 0) {
            // 父节点不展示
            return null;
        }
        const obj: any = {};
        obj.label = node.data.label;
        obj.sum = node.data.sum;
        obj.uv = node.data.uv;
        obj.value = node.value;
        obj.x = node.x;
        obj.y = node.y;
        source.push(obj);
        return node;
    });
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });
    chart.data(source);
    chart.scale({
        x: { nice: true },
        y: { nice: true },
    });

    chart.coordinate('polar', { innerRadius: 0.3 });
    chart.tooltip({
        showTitle: false,
        showMarkers: false,
    });
    chart.axis(false);
    chart.legend(false);

    chart
        .polygon()
        .position('x*y')
        .color('value', Blue5)
        .style({
            stroke: '#fff',
            lineWidth: 1,
        })
        .tooltip('label*sum');

    chart.interaction('element-active');

    chart.render();
}

export const MENU1 = '17';
export const MENU2 = '1';
export const TITLE = '旭日图';
