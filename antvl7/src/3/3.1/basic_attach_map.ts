import { Scene, LineLayer, PointLayer } from '@antv/l7';
import { GaodeMap, Mapbox } from '@antv/l7-maps';
import { CountryLayer } from '@antv/l7-district';
import { Blue5, Volcano10 } from '../../utils/theme';

export default function () {
    const scene = new Scene({
        id: 'map',
        map: new Mapbox({
            center: [116.2825, 39.9],
            pitch: 0,
            style: 'blank',
            zoom: 3,
            minZoom: 0,
            maxZoom: 10,
        }),
    });
    const attachMapContainer = document.createElement('div');
    attachMapContainer.id = 'attach';
    attachMapContainer.style.cssText = `position: absolute;
    height: 125px;
    width: 98px;
    right: 50px;
    bottom: 20px;
    border: 1px solid #333;`;
    document.getElementById('map')?.parentElement?.append(attachMapContainer);
    scene.on('loaded', () => {
        new CountryLayer(scene, {
            data: [],
            joinBy: ['NAME_CHN', 'name'],
            depth: 1,
            provinceStroke: '#fff',
            cityStroke: '#EBCCB4',
            cityStrokeWidth: 1,
            label: {
                enable: false,
            },
            fill: {
                color: {
                    field: 'NAME_CHN',
                    values: Blue5,
                },
            },
            popup: {
                enable: true,
                Html: (props) => `<span>${props.NAME_CHN}</span>`,
            },
        });
    });

    const scene2 = new Scene({
        id: 'attach',
        logoVisible: false,
        map: new Mapbox({
            center: [113.60540108435657, 12.833692637803168],
            pitch: 0,
            style: 'blank',
            zoom: 1.93,
            minZoom: 0,
            maxZoom: 3,
            interactive: false,
        }),
    });
    scene2.on('loaded', () => {
        new CountryLayer(scene2, {
            data: [],
            label: {
                enable: false,
            },
            popup: {
                enable: false,
            },
            autoFit: false,
            depth: 1,
            fill: {
                color: {
                    field: 'NAME_CHN',
                    values: Volcano10,
                },
            },
        });
    });
}

export const TITLE = '中国地图附图';
