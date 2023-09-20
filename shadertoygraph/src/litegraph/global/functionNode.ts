import { LGraphNode } from "litegraph.js";
import * as CONSTANTS from '../constants';

export default class FunctionNode extends LGraphNode {
    static title: string = 'function';

    argIndex: number[] = []; // [start, end]

    constructor() {
        super(FunctionNode.title);

        this.addInput(CONSTANTS.RETURN, CONSTANTS.RETURN_TYPE);

        this.properties = {
            argLength: 0,
            codeLength: 0,
        }

        console.log(this.inputs);
    }
}