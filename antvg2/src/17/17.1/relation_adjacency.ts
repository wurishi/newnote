import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';
import data from '../../data/flare.json';

export default function () {
    const ds = new DataSet();
    const dv = ds.createView().source(data, { type: 'hierarchy' });
    dv.transform({ type: 'hierarchy.partition', as: ['x', 'y'] });

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: 0,
    });
    chart.data(
        dv.getAllNodes().map((node) => ({
            name: node.data.name,
            value: node.value,
            depth: node.depth,
            x: node.x,
            y: node.y,
        }))
    );

    chart.scale({
        x: { nice: true },
        y: { nice: true },
    });
    chart.tooltip({
        showTitle: false,
        showMarkers: false,
    });
    chart.axis(false);
    chart.legend(false);
    chart.polygon().position('x*y').color('name');

    chart.interaction('element-active');
    chart.render();
}

export const MENU1 = '17';
export const MENU2 = '1';
export const TITLE = '相邻层次图';
