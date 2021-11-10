import { Scene, LineLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import data from '../../assets/1.1.json';

export default function () {
    const scene = new Scene({
        id: 'map',
        map: new GaodeMap({
            center: [120.19382669582967, 30.258134],
            pitch: 0,
            zoom: 16,
            style: 'dark',
        }),
    });
    scene.on('loaded', () => {
        const layer = new LineLayer()
            .source(data)
            .size(1.5)
            .shape('line')
            .color('#25d8b7')
            .animate({
                interval: 1, // 间隔
                duration: 1, // 持续时间
                trailLength: 2, // 流线长度
            });
        scene.addLayer(layer);
    });
}

export const TITLE = '路径动画';
