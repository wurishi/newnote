import './style.css'
import 'litegraph.js/css/litegraph.css'
import { LGraph, LGraphCanvas, LGraphNode, LiteGraph } from 'litegraph.js'

// const defaultKeys = Object.keys(LiteGraph.registered_node_types);
// defaultKeys.forEach(key => {
//   if (key === 'basic/const' || key === 'basic/watch') {
//     return
//   }
//   LiteGraph.unregisterNodeType(key);
// });

// LiteGraph.clearRegisteredTypes();

class MyAddNode extends LGraphNode {
  static title: string = 'Sum'; // menu title

  constructor() {
    super('Sum') // node title

    this.addInput('A', '');
    this.addInput('B', 'number');
    this.addOutput('A+B', 'number');
    this.properties = {
      precision: 1,
      code: `void main() {}`
    };
    this.boxcolor = '#00ff00';
  }

  onExecute(): void {
    let A = this.getInputData<number>(0);
    A = (A === undefined) ? 0 : A;
    let B = this.getInputData<number>(1);
    B = (B === undefined) ? 0 : B;
    // console.log(A, B)
    this.setOutputData(0, (A + B).toFixed(this.properties.precision));
  }

}
LiteGraph.registerNodeType('basic/sum', MyAddNode);

class TempObj extends LGraphNode {
  static title: string = 'TempObj';
  constructor() {
    super('TempObj');

    this.addOutput('Code', '');
    this.properties = {
      length: 0,
    }
  }

  onExecute(): void {
    this.setOutputData(0, { a: 100, b: 200 });
  }

  onPropertyChanged(property: string, value: any, prevValue: any): boolean | void {
    if (property === 'length') {
      const newV = Number(value);
      const oldV = Number(prevValue);
      if (newV > oldV) {
        for (let i = oldV; i < newV; i++) {
          this.addInput('line' + (i + 1), '');
        }
      } else if (newV < oldV) {
        for (let i = oldV; i >= newV; i--) {
          this.removeInput(i)
        }
      }
    }
  }
}
LiteGraph.registerNodeType('basic/Temp', TempObj);

const graph = new LGraph();
const canvas = new LGraphCanvas('#mycanvas', graph); // { autoresize: true }

const node_const = LiteGraph.createNode('basic/const');
node_const.pos = [200, 200];
graph.add(node_const);
node_const.setValue(4.5);

const node_const1 = LiteGraph.createNode('basic/const');
node_const1.pos = [200, 300];
graph.add(node_const1);
node_const1.setValue(1.0);

const node_watch = LiteGraph.createNode('basic/watch');
node_watch.pos = [700, 200];
graph.add(node_watch);

const node_sum = LiteGraph.createNode('basic/sum');
node_sum.pos = [400, 200];
graph.add(node_sum)

node_const.connect(0, node_sum, 0);
node_const1.connect(0, node_sum, 1);
node_sum.connect(0, node_watch, 0);

graph.start();

const result = graph.serialize();
console.log(result);