import { Chart } from '@antv/g2';
import scatter from '../../data/scatter.json';

export default function () {
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        limitInPlot: true,
    });
    chart.data(scatter);
    chart.animate(false);
    chart.scale({
        height: { nice: true },
        weight: { nice: true },
    });

    chart
        .point()
        .position(['height', 'weight'])
        .color('gender')
        .shape('circle')
        .style({
            fillOpacity: 0.85,
        });

    chart.interaction('view-zoom');
    chart.render();

    // 阻止默认事件，否则会整个窗口滚动
    chart.getCanvas().on('mousewheel', (ev) => ev.preventDefault());
}

export const MENU1 = '2';
export const MENU2 = '4';
export const TITLE = '缩放';
