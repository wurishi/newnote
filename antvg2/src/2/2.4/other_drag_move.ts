import { Chart, registerInteraction } from '@antv/g2';
import scatter from '../../data/scatter.json';
import INTERACTION from '../../utils/interaction';

const { TRIGGER, TRIGGER_EVENT, ACTION } = INTERACTION;

export default function () {
    registerInteraction('drag-move', {
        start: [
            {
                trigger: TRIGGER.PLOT(TRIGGER_EVENT.MOUSE_DOWN),
                action: ACTION.SCALE_TRANSLATE('start'),
            },
        ],
        processing: [
            {
                trigger: TRIGGER.PLOT(TRIGGER_EVENT.MOUSE_MOVE),
                action: ACTION.SCALE_TRANSLATE('translate'),
                throttle: {
                    wait: 100,
                    leading: true,
                    trailing: false,
                },
            },
        ],
        end: [
            {
                trigger: TRIGGER.PLOT(TRIGGER_EVENT.MOUSE_UP),
                action: ACTION.SCALE_TRANSLATE('end'),
            },
        ],
    });

    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        limitInPlot: true,
    });

    chart.data(scatter);
    chart.scale({
        height: { nice: true },
        weight: { nice: true },
    });
    chart.animate(false);
    chart
        .point()
        .position(['height', 'weight'])
        .color('gender')
        .shape('circle')
        .style({
            fillOpacity: 0.85,
        });

    chart.interaction('drag-move');

    chart.render();
}

export const MENU1 = '2';
export const MENU2 = '4';
export const TITLE = '拖拽';
