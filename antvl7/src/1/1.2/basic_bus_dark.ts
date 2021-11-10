// Data Source https://busrouter.sg/visualization/

import { Scene, LineLayer, PointLayer } from '@antv/l7';
import { GaodeMap, Mapbox } from '@antv/l7-maps';
import data from '../../assets/1.2.3.json';
import { Blue10 } from '../../utils/theme';

export default function () {
    const scene = new Scene({
        id: 'map',
        map: new Mapbox({
            style: 'dark',
            center: [103.83735604457024, 1.360253881403068],
            pitch: 4.00000000000001,
            zoom: 10.210275860702593,
            rotation: 19.313180925794313,
        }),
    });
    scene.on('loaded', () => {
        const layer = new LineLayer()
            .source(data, {
                parser: {
                    coordinates: 'path',
                    type: 'json',
                },
            })
            .size('level', (level) => [1, level * 1])
            .shape('line')
            .color('level', Blue10);

        scene.addLayer(layer);
    });
}

export const TITLE = '公交线路深色';
