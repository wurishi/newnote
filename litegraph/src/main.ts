import './style.css'
import { LGraph, LGraphCanvas, LiteGraph } from 'litegraph.js'

const graph = new LGraph();
const canvas = new LGraphCanvas('#mycanvas', graph);

const node_const = LiteGraph.createNode('basic/const');
node_const.pos = [200, 200];
graph.add(node_const);
node_const.setValue(4.5);

graph.start();