import { Scene, LineLayer, PointLayer } from '@antv/l7';
import { Mapbox } from '@antv/l7-maps';
import world from '../../assets/1.1.world.json';
import dot from '../../assets/1.1.dot.txt?raw';
import flyline from '../../assets/1.1.flyline.txt?raw';

export default function () {
    const scene = new Scene({
        id: 'map',
        map: new Mapbox({
            pitch: 40,
            style: {
                version: 8,
                sprite: 'https://lzxue.github.io/font-glyphs/sprite/sprite',
                glyphs: 'https://gw.alipayobjects.com/os/antvdemo/assets/mapbox/glyphs/{fontstack}/{range}.pbf',
                sources: {},
                layers: [
                    {
                        id: 'background',
                        type: 'background',
                        paint: {
                            'background-color': '#2b2b3a',
                        },
                    },
                ],
            },
            center: [3.438, 40.16797],
            zoom: 0.51329,
        }),
    });
    scene.on('loaded', () => {
        const dotData = eval(dot);
        const flydata = eval(flyline).map((item: any) => {
            const latlng1 = item.from.split(',').map((e: any) => e * 1);
            const latlng2 = item.to.split(',').map((e: any) => e * 1);
            return { coord: [latlng1, latlng2] };
        });

        const worldLine = new LineLayer()
            .source(world)
            .color('#41fc9d')
            .size(0.5)
            .style({
                opacity: 0.4,
            });

        const dotPoint = new PointLayer()
            .source(dotData, {
                parser: {
                    type: 'json',
                    x: 'lng',
                    y: 'lat',
                },
            })
            .shape('circle')
            .color('#ffed11')
            .animate(true)
            .size(40)
            .style({
                opacity: 1.0,
            });

        const flyLine = new LineLayer()
            .source(flydata, {
                parser: {
                    type: 'json',
                    coordinates: 'coord',
                },
            })
            .color('#ff6b34')
            .shape('arc3d')
            .size(2)
            .active(true)
            .animate({
                interval: 2,
                trailLength: 2,
                duration: 1,
            })
            .style({
                opacity: 1,
            });

        scene.addLayer(worldLine);
        scene.addLayer(dotPoint);
        scene.addLayer(flyLine);
    });
}

export const TITLE = '流向图';
