import { LGraph, LGraphCanvas, LiteGraph, } from 'litegraph.js'
import 'litegraph.js/css/litegraph.css';
import Watch from './watch';

import DefineNode from './global/defineNode';
import FunctionNode from './global/functionNode';

LiteGraph.clearRegisteredTypes();

LiteGraph.registerNodeType('watch', Watch);

LiteGraph.registerNodeType('定义/define', DefineNode);
LiteGraph.registerNodeType('定义/function', FunctionNode);

export default function () {
    const canvas = document.getElementById('litegraph_canvas') as HTMLCanvasElement;

    const graph = new LGraph();
    const gCanvas = new LGraphCanvas(canvas, graph, { autoresize: true });

    graph.start();
}