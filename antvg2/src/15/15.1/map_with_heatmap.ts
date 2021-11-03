import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';
import mapData from '../../data/usa.geo.json';

export default function () {
    const userData = [];
    const geoDv = new DataSet.View()
        .source(mapData, { type: 'geojson' })
        .transform({
            type: 'map',
            callback(row) {
                userData.push({
                    longitude: row.centroidX,
                    latitude: row.centroidY,
                    name: row.name,
                    value: Math.random() * (1000 - 1),
                });
                return row;
            },
        });

    const chart = new Chart({
        container: 'chart',
        height: 600,
        autoFit: true,
        padding: 0,
    });

    chart.scale({
        latitude: { sync: true },
        longitude: { sync: true },
    });
    chart.legend(false);
    chart.axis(false);
    chart.tooltip(false);

    const geoView = chart.createView();
    geoView.data(geoDv.rows);
    geoView
        .polygon()
        .position('longitude*latitude')
        .color('grey')
        .label('name', { offset: 0 });

    const userView = chart.createView();
    userView.data(userData);
    userView
        .heatmap()
        .position('longitude*latitude')
        .color(
            'value',
            '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2'
        )
        .size(500 / 20)
        .style({
            blur: 500 / 15,
        });

    chart.render();
}

export const MENU1 = '15';
export const MENU2 = '1';
export const TITLE = '带热力图的地图';
