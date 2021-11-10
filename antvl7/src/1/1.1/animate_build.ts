import { Scene, CityBuildingLayer, LineLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps';
import data from '../../assets/1.1.build.json';
import line from '../../assets/1.1.json';

export default function () {
    const scene = new Scene({
        id: 'map',
        map: new GaodeMap({
            style: 'amap://styles/a49ef8d081db7b85adb2e90ba7941f1e?isPublic=true',
            center: [120.173104, 30.244072],
            pitch: 70.41138037735848,
            zoom: 17.18,
            rotation: 2.24, // 358.7459759480504
            minZoom: 14,
        }),
    });
    scene.on('loaded', () => {
        const layer = new CityBuildingLayer({ zIndex: 1 });
        layer
            .source(data)
            .size('floor', [100, 3000])
            .color('rgba(242, 246, 250, 0.5)')
            .animate({ enable: true })
            .style({
                opacity: 1.0,
                baseColor: 'rgba(36, 16, 63, 0.3)',
                windowColor: '#0e0220',
                brightColor: '#08faee',
            });
        scene.addLayer(layer);

        const lineLayer = new LineLayer({ zIndex: 0 })
            .source(line)
            .size(1)
            .shape('line')
            .color('#ff893a')
            .animate({
                interval: 1,
                duration: 2,
                trailLength: 2,
            });
        scene.addLayer(lineLayer);
    });
}

export const TITLE = '点亮城市';
