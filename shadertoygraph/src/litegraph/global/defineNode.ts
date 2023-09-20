import { LGraphNode } from "litegraph.js";
import * as CONSTANTS from '../constants';

export default class DefineNode extends LGraphNode {
    static title: string = '#define';

    constructor() {
        super(DefineNode.title);

        this.addInput('value', 'string');
        this.addOutput('name', 'string');
        this.addOutput(CONSTANTS.CODE, CONSTANTS.CODE_TYPE);
        this.properties = {
            name: 'foo',
            value: 'iTime',
        }
    }

    onExecute(): void {
        const name = this.properties.name;
        this.setOutputData(0, name);
        const value = this.getInputData(0) || this.properties.value
        this.setOutputData(1, `#define ${name} ${value}`);
    }
}