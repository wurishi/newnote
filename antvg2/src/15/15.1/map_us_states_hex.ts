import { Chart } from '@antv/g2';
import data from '../../data/us-states.hex.json';
import DataSet from '@antv/data-set';

export default function () {
    const dv = new DataSet.View().source(data as any, {
        type: 'hex',
        width: 100,
        height: 100,
    });
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 700,
        padding: 20,
    });
    chart.scale({
        x: { sync: true },
        y: { sync: true },
    });

    chart.coordinate('rect').reflect('y'); // 视数据而定要不要翻转 Y 轴。
    chart.tooltip({
        showTitle: false,
        showMarkers: false,
    });
    chart.axis(false);

    const bgView = chart.createView();
    bgView.data(dv._gridRows);
    bgView
        .polygon()
        .position('x*y')
        .color('grey')
        .style({
            stroke: 'white',
            lineWidth: 1,
            opacity: 0.3,
        })
        .tooltip('key');

    const mapView = chart.createView();
    mapView.data(dv.rows);
    mapView
        .polygon()
        .position('x*y')
        .color('#5B8FF9')
        .style({
            stroke: 'white',
            lineWidth: 5,
        })
        .label('key', {
            offset: 0,
            style: {
                fontSize: 18,
                fontWeight: 500,
            },
        })
        .tooltip('capital');

    mapView.interaction('element-active');

    chart.render();
}

export const MENU1 = '15';
export const MENU2 = '1';
export const TITLE = '美国地图六边形分割';
