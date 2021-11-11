import { Scene, LineLayer, PointLayer } from '@antv/l7';
import { GaodeMap, Mapbox } from '@antv/l7-maps';
import { CityLayer } from '@antv/l7-district';
import provinceData from '../../assets/3.1.3.json';

export default function () {
    const data = Object.keys(provinceData).map((key) => {
        const v = (provinceData as any)[key];
        return {
            code: key,
            name: v[0],
            pop: v[2] * 1,
        };
    });
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
        new CityLayer(scene, {
            data,
            joinBy: ['adcode', 'code'],
            adcode: ['330000', '330100'],
            depth: 3,
            label: {
                field: 'NAME_CHN',
                textAllowOverlap: false,
            },
            bubble: {
                enable: true,
                size: {
                    field: 'pop',
                    values: [3, 20],
                },
            },
            popup: {
                enable: true,
                triggerLayer: 'fill',
                Html: (props) => props.NAME_CHN + ':' + props.pop,
            },
        });
    });
}

export const TITLE = '中国市地图气泡';
