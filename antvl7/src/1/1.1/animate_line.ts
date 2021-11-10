import { Scene, LineLayer, PointLayer } from '@antv/l7';
import { GaodeMap, Mapbox } from '@antv/l7-maps';
import data from '../../assets/1.1.line.json';

export default function () {
    const scene = new Scene({
        id: 'map',
        map: new Mapbox({
            center: [-74.006, 40.7128],
            zoom: 14,
            style: 'dark',
        }),
    });
    scene.on('loaded', () => {
        const lineLayer = new LineLayer()
            .source(data, { parser: { type: 'json', coordinates: 'path' } })
            .size(1.5)
            .shape('line')
            .color('color', (v) => `rgb(${v})`)
            .animate({
                interval: 0.6,
                trailLength: 1.5,
                duration: 6,
            });
        scene.addLayer(lineLayer);
    });
}

export const TITLE = '轨迹动画';
