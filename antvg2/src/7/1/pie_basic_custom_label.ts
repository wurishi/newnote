import { Chart, getEngine } from '@antv/g2';
const G = getEngine('canvas');
import man from '../../assets/man.png';
import women from '../../assets/woman.png';

export default function () {
    const data = [
        { sex: '男', sold: 0.45 },
        { sex: '女', sold: 0.55 },
    ];

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [20, 30, 30, 20],
    });

    chart.coordinate('theta', { radius: 0.8 });

    chart.data(data);

    chart.tooltip({
        showTitle: false,
        showMarkers: false,
    });

    const colors = ['#1890ff', '#f04864'];

    chart
        .interval()
        .adjust('stack')
        .position('sold')
        .color('sex', colors)
        .label('sold', {
            content: (obj) => {
                const group = new G.Group({});
                group.addShape({
                    type: 'image',
                    attrs: {
                        x: 0,
                        y: 0,
                        width: 40,
                        height: 50,
                        img: obj.sex === '男' ? man : women,
                    },
                });

                group.addShape({
                    type: 'text',
                    attrs: {
                        x: 20,
                        y: 54,
                        text: obj.sex,
                        textAlign: 'center',
                        textBaseline: 'top',
                        fill: obj.sex === '男' ? colors[0] : colors[1],
                    },
                });

                return group;
            },
        });

    chart.interaction('element-active');

    chart.render();
}

export const MENU1 = '7';
export const MENU2 = '1';
export const TITLE = '个性化标签饼图';
