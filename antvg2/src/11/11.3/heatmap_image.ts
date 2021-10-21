import { Chart } from '@antv/g2';
import data from '../../data/heatmap.json';
import { Blue10 } from '../../utils/theme';

export default function () {
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [0, 30, 60, 30],
    });
    chart.data(data);
    chart.scale({
        tmp: { nice: true },
    });
    chart.tooltip({
        showTitle: false,
    });
    chart.axis(false);
    chart.legend({ offsetX: 10, offsetY: 10 });
    chart
        .heatmap()
        .position('g*l')
        .color(
            'tmp',
            '#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2'
        );
    chart.annotation().image({
        start: ['min', 'max'],
        end: ['max', 'min'],
        src: 'https://gw.alipayobjects.com/zos/rmsportal/NeUTMwKtPcPxIFNTWZOZ.png',
    });

    chart.render();
}

export const MENU1 = '11';
export const MENU2 = '3';
export const TITLE = '热力图';
