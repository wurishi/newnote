import { Chart, registerInteraction } from '@antv/g2';
import INTERACTION from '../../utils/interaction';
import iris from '../../data/iris.json';

const { TRIGGER, TRIGGER_EVENT, ACTION } = INTERACTION;

export default function () {
    registerInteraction('highlight-view', {
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
                action: [
                    ACTION.ELEMENT_SIBLING_HIGHLIGHT('highlight'),
                    ACTION.ELEMENT_RANGE_HIGHLIGHT('highlight'),
                ],
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
            {
                trigger: TRIGGER.DOCUMENT(TRIGGER_EVENT.MOUSE_DOWN),
                action: [
                    ACTION.ELEMENT_SIBLING_HIGHLIGHT('clear'),
                    ACTION.ELEMENT_RANGE_HIGHLIGHT('clear'),
                    ACTION.RECT_MASK('end'),
                    ACTION.RECT_MASK('hide'),
                ],
                once: true,
                isEnable: (context) => !context.isInPlot(),
            },
            {
                trigger: TRIGGER.DOCUMENT(TRIGGER_EVENT.MOUSE_UP),
                action: ACTION.RECT_MASK('end'),
                once: true,
                isEnable: (context) => !context.isInPlot(),
            },
        ],
        rollback: [
            {
                trigger: TRIGGER_EVENT.DBCLICK,
                action: [
                    ACTION.RECT_MASK('hide'),
                    ACTION.ELEMENT_SIBLING_HIGHLIGHT('clear'),
                    ACTION.ELEMENT_RANGE_HIGHLIGHT('clear'),
                ],
            },
        ],
    });

    const COLOR = ['#880000', '#008800', '#000088'];
    const chart = new Chart({
        container: 'chart',
        autoFit: true,
        height: 500,
        padding: [16, 16, 48, 48],
    });

    chart.data(iris);
    chart.animate(false);
    chart.scale({
        Species: { sync: true },
        SepalLength: { nice: true },
        SepalWidth: { nice: true },
        PetalLength: { nice: true },
        PetalWidth: { nice: true },
    });
    chart.tooltip(false);
    chart.facet('matrix', {
        fields: ['SepalLength', 'SepalWidth', 'PetalLength', 'PetalWidth'],
        eachView(view, facet) {
            view.interaction('highlight-view');
            view.point()
                .position([facet.columnField, facet.rowField])
                .color('Species', COLOR)
                .shape('circle')
                .style({ fillOpacity: 0.65 })
                .size(3);
        },
    });

    chart.render();
}

export const MENU1 = '2';
export const MENU2 = '3';
export const TITLE = '多 View 框选高亮';
