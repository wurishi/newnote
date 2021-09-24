import { Chart } from '@antv/g2';
import DataSet from '@antv/data-set';
import data from '../../data/rain-flow.json';

export default function () {
    const ds = new DataSet({
        state: {
            start: new Date('2009/7/20 0:00').getTime(),
            end: new Date('2009/9/9 0:00').getTime(),
        },
    });
    const dv = ds.createView('origin').source(data);
    dv.transform({
        type: 'filter',
        callback: (obj) => {
            const time = new Date(obj.time).getTime();
            return time >= ds.state.start && time <= ds.state.end;
        },
    });

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 440,
        padding: [16, 50, 64],
    });
    chart.data(dv.rows);

    chart.scale({
        time: {
            type: 'time',
            tickCount: 8,
            mask: 'M/DD HH:mm',
        },
        flow: {
            alias: '流量(m^3/s)',
            tickInterval: 50,
            max: 300,
            min: 0,
        },
        rain: {
            alias: '降雨量(mm)',
            min: 0,
            max: 12,
            tickInterval: 2,
        },
    });
    chart.axis('rain', {
        grid: null,
        title: {},
    });
    chart.axis('flow', { title: {} });
    const color = ['l(100) 0:#a50f15 1:#fee5d9', 'l(100) 0:#293c55 1:#f7f7f7'];
    chart.legend({
        position: 'top',
        custom: true,
        offsetY: 4,
        items: [
            {
                name: 'flow',
                value: 'flow',
                marker: {
                    symbol: 'circle',
                    style: {
                        fill: color[0],
                        r: 5,
                    },
                },
            },
            {
                name: 'rain',
                value: 'rain',
                marker: {
                    symbol: 'circle',
                    style: {
                        fill: color[1],
                        r: 5,
                    },
                },
            },
        ],
    });
    chart.tooltip({
        showCrosshairs: true,
        shared: true,
    });
    chart.option('slider', {
        start: 0.1,
        end: 0.8,
        trendCfg: {
            isArea: false,
        },
    });
    chart.area().position('time*flow').color(color[0]);
    chart.area().position('time*rain').color(color[1]);

    chart.interaction('element-visible-filter');

    chart.render();
}

export const MENU1 = '4';
export const MENU2 = '1';
export const TITLE = '大规模区域图';
