import { Scene, LineLayer, PointLayer } from '@antv/l7';
import { GaodeMap, Mapbox } from '@antv/l7-maps';
import data from '../../assets/1.2.6.txt?raw';

export default function () {
    const scene = new Scene({
        id: 'map',
        map: new GaodeMap({
            center: [121.417463, 31.215175],
            style: 'dark',
            pitch: 0,
            zoom: 11,
        }),
    });
    scene.on('loaded', () => {
        const pointLayer = new PointLayer()
            .source(data, {
                parser: {
                    type: 'csv',
                    y: 'lat',
                    x: 'lng',
                },
            })
            .size(0.5)
            .color('#080298')
            .style({
                opacity: 1,
            });

        scene.addLayer(pointLayer);
    });
}

export const TITLE = '亮度图';
