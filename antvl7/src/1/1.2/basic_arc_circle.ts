import { Scene, LineLayer, PointLayer } from '@antv/l7';
import { GaodeMap, Mapbox } from '@antv/l7-maps';
import data from '../../assets/1.2.2.txt?raw';

export default function () {
    const scene = new Scene({
        id: 'map',
        map: new Mapbox({
            style: 'dark',
            pitch: 0,
            center: [107.77791556935472, 35.443286920228644],
            zoom: 2.9142882493605033,
        }),
    });
    scene.on('loaded', () => {
        const layer = new LineLayer()
            .source(data, {
                parser: {
                    type: 'csv',
                    x: 'lng1',
                    y: 'lat1',
                    x1: 'lng2',
                    y1: 'lat2',
                },
            })
            .size(1)
            .shape('arc')
            .color('#8C1EB2')
            .style({
                opacity: 0.8,
                blur: 0.99,
            });

        scene.addLayer(layer);
    });
}

export const TITLE = '弧线地图';
