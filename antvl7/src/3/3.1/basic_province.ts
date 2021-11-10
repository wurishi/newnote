import { Scene, LineLayer, PointLayer } from '@antv/l7';
import { GaodeMap, Mapbox } from '@antv/l7-maps';
import { ProvinceLayer } from '@antv/l7-district';
import provinceData from '../../assets/3.1.3.json';
import { Blue10 } from '../../utils/theme';

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
        const pData: any = provinceData;
        const data = Object.keys(pData).map((key) => ({
            code: key,
            name: pData[key][0],
            pop: pData[key][2] * 1,
        }));

        new ProvinceLayer(scene, {
            data,
            joinBy: ['adcode', 'code'],
            adcode: ['330000'],
            depth: 3,
            label: {
                field: 'NAME_CHN',
                textAllowOverlap: false,
            },
            fill: {
                color: {
                    field: 'pop',
                    values: Blue10,
                },
            },
            popup: {
                enable: true,
                Html: (props) =>
                    `<span>${props.NAME_CHN}:</span><span>${props.pop}</span>`,
            },
        });
    });
}

export const TITLE = '中国省级地图';
