import { Chart } from '@antv/g2';
import sp500 from '../../data/sp500.json';

export default function () {
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        defaultInteractions: [],
    });
    chart.tooltip({ showCrosshairs: true });
    // chart.removeInteraction('tooltip');
    chart.scale({
        date: {
            sync: true,
            tickCount: 5,
            range: [0, 1],
        },
        price: { sync: true },
    });

    const padding = [10, 10, 40, 60];

    const view1 = chart.createView({
        region: {
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0.4 },
        },
        padding,
    });
    view1.animate(false);
    view1.data(sp500);
    view1.interaction('tooltip');
    view1.interaction('sibling-tooltip');
    view1.area().position(['date', 'price']);

    const view2 = chart.createView({
        region: {
            start: { x: 0, y: 0.4 },
            end: { x: 1, y: 0.8 },
        },
        padding,
    });
    view2.data(sp500);
    view2.interaction('tooltip');
    view2.interaction('sibling-tooltip');
    view2.interval().position(['date', 'price']);

    const view3 = chart.createView({
        region: {
            start: { x: 0, y: 0.8 },
            end: { x: 1, y: 1 },
        },
        padding,
    });
    view3.interaction('tooltip');
    view3.interaction('sibling-tooltip');
    view3.data(sp500);
    view3.line().position('date*price');

    chart.render();
}

export const MENU1 = '2';
export const MENU2 = '4';
export const TITLE = 'tooltip 联动';
