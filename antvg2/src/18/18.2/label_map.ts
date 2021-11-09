import { Chart } from '@antv/g2';
import mapData from '../../data/world.geo.json';
import DataSet from '@antv/data-set';

export default function () {
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [55, 20],
    });
    chart.tooltip(false);
    chart.axis(false);
    chart.legend('trend', {
        position: 'left',
    });

    const worldMap = new DataSet.View().source(mapData, { type: 'geojson' });
    chart.data(worldMap.rows);
    chart.tooltip(false);
    chart
        .polygon()
        .position('longitude*latitude')
        .label('name', {
            layout: {
                type: 'fixed-overlap',
            },
            offset: 0,
            style: {
                fill: 'black',
                stroke: '#fff',
                lineWidth: 2,
            },
        })
        .style({
            fill: '#CED4D9',
            stroke: '#F2F4F5',
            lineWidth: 0.5,
        });

    // chart.interaction('element-active');

    chart.render();
}

export const MENU1 = '18';
export const MENU2 = '2';
export const TITLE = '地图文本';
