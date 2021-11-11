import { Scene, LineLayer, PointLayer } from '@antv/l7';
import { GaodeMap, Mapbox } from '@antv/l7-maps';
import { CountryLayer, CountyLayer } from '@antv/l7-district';
import { Volcano10 } from '../../utils/theme';

export default function () {
    const scene = new Scene({
        id: 'map',
        map: new Mapbox({
            center: [116.2825, 39.9],
            pitch: 0,
            style: 'blank',
            zoom: 3,
            minZoom: 3,
            maxZoom: 10,
        }),
    });
    scene.on('loaded', () => {
        new CountyLayer(scene, {
            data: [],
            adcode: ['110101', '110102', '110106'],
            depth: 3,
            label: {
                field: 'NAME_CHN',
            },
            bubble: {
                enable: true,
                color: {
                    field: 'NAME_CHN',
                    values: Volcano10,
                },
            },
            popup: {
                enable: true,
            },
        });
    });
}

export const TITLE = '中国县地图气泡';
