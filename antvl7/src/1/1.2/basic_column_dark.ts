import { Scene, LineLayer, PointLayer } from '@antv/l7';
import { GaodeMap, Mapbox } from '@antv/l7-maps';
import data from '../../assets/1.2.1.json';
import { Blue10, Blue5, Green10 } from '../../utils/theme';

export default function () {
    const scene = new Scene({
        id: 'map',
        map: new GaodeMap({
            pitch: 35.210526315789465,
            style: 'dark',
            center: [104.288144, 31.239692],
            zoom: 4.4,
        }),
    });
    scene.on('loaded', () => {
        const pointLayer = new PointLayer({})
            .source(data.list, {
                parser: {
                    type: 'json',
                    x: 'j',
                    y: 'w',
                },
            })
            .shape('cylinder')
            .size('t', (level) => [1, 2, level * 2 + 20])
            .active(true)
            .color('t', Blue10)
            .style({ opacity: 1 });

        scene.addLayer(pointLayer);
    });
}

export const TITLE = '3D柱图深色';
