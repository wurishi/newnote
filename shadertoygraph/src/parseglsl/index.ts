import { GUI } from 'dat.gui'
import GraphBasic from './GraphBasic';

let graphList = new Array<GraphBasic>();

export default function (updateConfig: any, config: any, gui: GUI, passIndex: number) {
    // config.renderpass[passIndex].inputs[j]
    graphList.length = 0;
    const pass: {
        code: string;
    } = config.renderpass[passIndex];
    groupGLSL(pass.code);

    const uiData = {
        code() {

        }
    };
    gui.add(uiData, 'code');
}

function groupGLSL(code: string) {
    const arr = code.split('\n')
    const graphArr = arr.map((code, index) => new GraphBasic(index, code));

    graphList = graphArr;
}