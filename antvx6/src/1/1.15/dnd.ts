import { Graph, Dom, Addon } from '@antv/x6';
import './style.css';

const { Dnd } = Addon;

export default function () {
    const container = document.createElement('div');
    container.style.minWidth = '200px';
    container.style.float = 'left';

    ['HiveInput', 'DropZoneInput', 'BigQueryInput'].forEach((key) => {
        const rect = document.createElement('div');
        rect.className = 'dnd-rect';
        rect.innerHTML = key;
        rect.setAttribute('data-type', key);
        container.appendChild(rect);
        rect.addEventListener('mousedown', startDrag);
        rect.setAttribute('color', '#31d0c6');
    });

    [
        'DfJoinTransform',
        'DfSparkSQLTransform',
        'DfFeatureCalcTransform',
    ].forEach((key) => {
        const rect = document.createElement('div');
        rect.className = 'dnd-rect1';
        rect.innerHTML = key;
        rect.setAttribute('data-type', key);
        container.appendChild(rect);
        rect.addEventListener('mousedown', startDrag);
        rect.setAttribute('color', 'pink');
    });

    ['HiveOutput', 'BigQueryOutput', 'GcsOutput'].forEach((key) => {
        const rect = document.createElement('div');
        rect.className = 'dnd-rect2';
        rect.innerHTML = key;
        rect.setAttribute('data-type', key);
        container.appendChild(rect);
        rect.addEventListener('mousedown', startDrag);
        rect.setAttribute('color', 'blue');
    });

    ['BatchAuditor', 'BatchValidator'].forEach((key) => {
        const rect = document.createElement('div');
        rect.className = 'dnd-rect3';
        rect.innerHTML = key;
        rect.setAttribute('data-type', key);
        container.appendChild(rect);
        rect.addEventListener('mousedown', startDrag);
        rect.setAttribute('color', 'green');
    });

    // const circle = document.createElement('circle');
    // circle.className = 'dnd-circle';
    // circle.innerHTML = 'Circle';
    // circle.setAttribute('data-type', 'circle');
    // container.appendChild(circle);
    // circle.addEventListener('mousedown', startDrag);

    const app = document.getElementById('app')!;
    app.style.float = 'left';
    document.body.insertBefore(container, app);

    const graph = new Graph({
        container: app,
        grid: true,
        history: true,
        snapline: {
            enabled: true,
            sharp: true,
        },
        scroller: {
            enabled: true,
            pageVisible: false,
            pageBreak: false,
            pannable: true,
        },
        mousewheel: {
            enabled: true,
            modifiers: ['ctrl', 'meta'],
        },
    });

    const source = graph.addNode({
        x: 130,
        y: 30,
        width: 100,
        height: 40,
        attrs: {
            label: {
                text: 'steps',
                fill: '#6a6c8a',
            },
            body: {
                stroke: '#31d0c6',
                strokeWidth: 2,
            },
        },
    });

    const dnd = new Dnd({
        target: graph,
        scaled: false,
        animation: true,
        validateNode: (node) => {
            setTimeout(() => {
                graph.addEdge({ source, target: node });
            }, 10);
            return true;
        },
    });

    function startDrag(e: MouseEvent) {
        const target = e.currentTarget as HTMLDivElement;
        const type = target.getAttribute('data-type');
        const color = target.getAttribute('color');
        const d = {
            width: 100,
            height: 40,
            attrs: {
                label: {
                    text: type,
                    fill: '#6a6c8a',
                },
                body: {
                    stroke: color,
                    strokeWidth: 2,
                },
            },
        };
        // if (type === 'rect') {
        //     d.attrs.label.text = 'Rect';
        // } else {
        //     d.attrs.label.text = 'Circle';
        // }
        const node = graph.createNode(d);
        dnd.start(node, e);
    }

    return () => {
        app.style.float = '';
        document.body.removeChild(container);
        // rect.removeEventListener('mousedown', startDrag);
        // circle.removeEventListener('mousedown', startDrag);
    };
}

export const TITLE = '拖拽 Dnd';
