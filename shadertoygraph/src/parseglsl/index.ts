import { GUI } from 'dat.gui'
import GraphBasic from './GraphBasic';

let graphList = new Array<GraphBasic>();

export default function (updateConfig: any, config: any, gui: GUI, passIndex: number) {
    // config.renderpass[passIndex].inputs[j]
    graphList.length = 0;
    const pass: {
        code: string;
    } = config.renderpass[passIndex];
    graphList = groupGLSL(pass.code);

    const uiData = {
        code() {
            createCodePanel(graphList);
        }
    };
    gui.add(uiData, 'code');
}

function groupGLSL(code: string) {
    const arr = code.split('\n')
    const graphArr = arr.map((code, index) => new GraphBasic(index, code));

    return graphArr;
}

function createCodePanel(list: GraphBasic[]) {
    const dom: HTMLDivElement = document.querySelector('#tools')!;

    let panel: HTMLDivElement | null = document.querySelector('#codePanel');
    if (!panel) {
        panel = document.createElement('div');
        panel.id = 'codePanel';
        dom.appendChild(panel);
    }

    list.forEach(it => {
        const item = document.createElement('div');
        item.innerHTML = it.getCode();
        // item.contentEditable = 'true';
        // item.contentEditable = 'plaintext-only';
        item.style.setProperty('-webkit-user-modify', 'read-write-plaintext-only');
        panel!.appendChild(item);
    })
}