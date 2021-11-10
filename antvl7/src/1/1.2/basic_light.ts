import { Scene, LineLayer, PointLayer, HeatmapLayer } from '@antv/l7';
import { GaodeMap, Mapbox } from '@antv/l7-maps';
import data from '../../assets/1.2.4.csv?raw';
import { Green10 } from '../../utils/theme';

export default function () {
    const scene = new Scene({
        id: 'map',
        map: new Mapbox({
            style: 'dark',
            pitch: 43,
            center: [120.13383079335335, 29.651873105004427],
            zoom: 7.068989519212174,
        }),
    });
    scene.on('loaded', () => {
        const layer = new HeatmapLayer()
            .source(data, {
                parser: {
                    type: 'csv',
                    x: 'lng',
                    y: 'lat',
                },
                transforms: [
                    {
                        type: 'hexagon',
                        size: 2500,
                        field: 'v',
                        method: 'sum',
                    },
                ],
            })
            .size('sum', (sum) => sum * 200)
            .shape('hexagonColumn')
            .style({
                coverage: 0.8,
                angle: 0,
                opacity: 1.0,
            })
            .color('sum', Green10);

        scene.addLayer(layer);
    });
}

export const TITLE = '蜂窝图3D';
