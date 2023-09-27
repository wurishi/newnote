import { LGraph, LGraphCanvas, LiteGraph, } from 'litegraph.js'
import 'litegraph.js/css/litegraph.css';
import Watch from './watch';

import DefineNode from './global/defineNode';
import FunctionNode from './global/functionNode';
import VarNode from './global/varNode';
import { GUI } from 'dat.gui';

LiteGraph.clearRegisteredTypes();

LiteGraph.registerNodeType('log/watch', Watch);

LiteGraph.registerNodeType('定义/define', DefineNode);
LiteGraph.registerNodeType('定义/function', FunctionNode);
LiteGraph.registerNodeType('定义/var', VarNode);

export default function (gui: GUI) {
    const canvas = document.getElementById('litegraph_canvas') as HTMLCanvasElement;

    const graph = new LGraph();
    const gCanvas = new LGraphCanvas(canvas, graph, { autoresize: true });

    graph.start();

    const guiData = {
        showLiteGraph: false
    }
    gui.add(guiData, 'showLiteGraph').onChange(v => {
        if (canvas.parentElement) {
            canvas.parentElement.style.visibility = v ? '' : 'hidden';
        }
    });
}