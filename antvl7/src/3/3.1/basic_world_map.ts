import { Scene, LineLayer, PointLayer } from '@antv/l7';
import { GaodeMap, Mapbox } from '@antv/l7-maps';
import { WorldLayer } from '@antv/l7-district';
import { Blue10, Blue5 } from '../../utils/theme';

export default function () {
    const scene = new Scene({
        id: 'map',
        map: new Mapbox({
            center: [116.2825, 39.9],
            pitch: 0,
            style: 'blank',
            zoom: 0,
            minZoom: 0,
            maxZoom: 5,
        }),
    });
    scene.on('loaded', () => {
        new WorldLayer(scene, {
            data: [],
            fill: {
                color: {
                    field: 'NAME_CHN',
                    values: Blue10,
                },
            },
            stroke: '#ccc',
            label: {
                enable: true,
                textAllowOverlap: false,
                field: 'NAME_CHN',
            },
            popup: {
                enable: false,
                Html: (props) => `<span>${props.NAME_CHN}</span>`,
            },
        });
    });
}

export const TITLE = '世界地图';
