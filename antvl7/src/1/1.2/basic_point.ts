import { Scene, LineLayer, PointLayer } from '@antv/l7';
import { GaodeMap, Mapbox } from '@antv/l7-maps';
import data from '../../assets/1.2.5.json';
import { Blue10 } from '../../utils/theme';

export default function () {
    const scene = new Scene({
        id: 'map',
        map: new GaodeMap({
            pitch: 64.88,
            style: 'dark',
            center: [114.060288, 22.53684],
            zoom: 15.63,
        }),
    });
    scene.on('loaded', () => {
        const pointLayer = new PointLayer()
            .source(data)
            .size(2)
            .color('h8', Blue10)
            .style({
                opacity: 1,
            });

        scene.addLayer(pointLayer);
    });
}

export const TITLE = '海量点';
