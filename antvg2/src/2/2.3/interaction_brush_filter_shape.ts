import { Chart, registerInteraction } from '@antv/g2';
import INTERACTION from '../../utils/interaction';
import scatter from '../../data/scatter.json';

const { TRIGGER, TRIGGER_EVENT, ACTION } = INTERACTION;

export default function () {
    registerInteraction('other-visible', {
        showEnable: [
            {
                trigger: TRIGGER.PLOT(TRIGGER_EVENT.MOUSE_ENTER),
                action: ACTION.CURSOR('crosshair'),
            },
            {
                trigger: TRIGGER.MASK(TRIGGER_EVENT.MOUSE_ENTER),
                action: ACTION.CURSOR('move'),
            },
            {
                trigger: TRIGGER.PLOT(TRIGGER_EVENT.MOUSE_LEAVE),
                action: ACTION.CURSOR('default'),
            },
            {
                trigger: TRIGGER.MASK(TRIGGER_EVENT.MOUSE_LEAVE),
                action: ACTION.CURSOR('crosshair'),
            },
        ],
        start: [
            {
                trigger: TRIGGER.PLOT(TRIGGER_EVENT.MOUSE_DOWN),
                action: [ACTION.RECT_MASK('start'), ACTION.RECT_MASK('show')],
                isEnable: (context) => !context.isInShape('mask'),
            },
            {
                trigger: TRIGGER.MASK(TRIGGER_EVENT.DRAG_START),
                action: ACTION.RECT_MASK('moveStart'),
            },
        ],
        processing: [
            {
                trigger: TRIGGER.PLOT(TRIGGER_EVENT.MOUSE_MOVE),
                action: ACTION.RECT_MASK('resize'),
            },
            {
                trigger: TRIGGER.MASK(TRIGGER_EVENT.DRAG),
                action: ACTION.RECT_MASK('move'),
                isEnable: (context) => context.isInPlot(),
            },
            {
                trigger: TRIGGER.MASK(TRIGGER_EVENT.CHANGE),
                action: ACTION.ELEMENT_SIBLING_FILTER('filter'),
            },
        ],
        end: [
            {
                trigger: TRIGGER.PLOT(TRIGGER_EVENT.MOUSE_UP),
                action: ACTION.RECT_MASK('end'),
            },
            {
                trigger: TRIGGER.MASK(TRIGGER_EVENT.DRAG_END),
                action: ACTION.RECT_MASK('moveEnd'),
            },
        ],
        rollback: [
            {
                trigger: TRIGGER_EVENT.DBCLICK,
                action: [
                    ACTION.RECT_MASK('hide'),
                    ACTION.ELEMENT_SIBLING_FILTER('reset'),
                ],
            },
        ],
    });

    const femaleData = scatter.filter((record) => record.gender === 'female');
    const maleData = scatter.filter((record) => record.gender !== 'female');
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
    });
    chart.tooltip(false);
    chart.scale({
        gender: { sync: true },
        weight: { sync: true, nice: true },
        height: {
            sync: true,
            nice: true,
        },
    });

    const padding = [10, 20, 40, 50];

    const view1 = chart.createView({
        region: {
            start: { x: 0, y: 0 },
            end: { x: 0.5, y: 1 },
        },
        padding,
    });
    view1.data(maleData);
    view1.interaction('other-visible');
    view1
        .point()
        .position('height*weight')
        .color('gender')
        .shape('circle')
        .style({ fillOpacity: 0.85 });

    const view2 = chart.createView({
        region: {
            start: { x: 0.5, y: 0 },
            end: { x: 1, y: 1 },
        },
        padding,
    });
    view2.data(femaleData);
    view2.interaction('other-visible');
    view2
        .point()
        .position('height*weight')
        .color('gender')
        .shape('circle')
        .style({
            fillOpacity: 0.85,
        });
    chart.render();
}

export const MENU1 = '2';
export const MENU2 = '3';
export const TITLE = '多 View 图形联动';
