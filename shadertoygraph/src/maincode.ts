import ShaderToy from './shaderToy';
import Stats from 'stats.js';
import { GUI, GUIController } from 'dat.gui';
import { EffectPassInfo, Sampler, ShaderPassConfig } from './type';
import Names from './name';
import Images from './image';
import { getAssetsUrl } from './utils/proxy';

const configs = import.meta.glob('../export/*.json');

function init() {
    const app = document.querySelector('#app')!;
    const tools = document.querySelector('#tools')!;

    const stats = new Stats();
    tools.appendChild(stats.dom);
    stats.dom.style.left = '';
    stats.dom.style.right = '300px';

    let shaderToy = new ShaderToy();
    app.appendChild(shaderToy.canvas);
    shaderToy.start(() => {
        stats.update();
    });

    const guiData: any = {
        current: '',
    };
    const gui = new GUI();
    const mainFolder = gui.addFolder('主菜单');
    const shaders: Record<string, any> = {};
    const shaderNames: Record<string, string> = {};
    Object.keys(configs).forEach(key => {
        const arr = key.split('/');
        const name = arr.at(-1)!.split('.')[0];
        const code = name.split('_')[0];
        shaderNames[(Names as any)[code] || name] = name;
        shaders[name] = configs[key];
    });
    const setCurrent = (config: any) => {
        const info = createInfo(config);
        const renderpass = createShaderPassConfig(config);

        showShaderInfo(info);
        shaderToy.newEffect(renderpass);
        recordViewedShader(config);

        // TODO: sound controller
        shaderToy.setGainValue(0.5);
    };
    const current = mainFolder.add(guiData, 'current', shaderNames).name('shader').onChange(name => {
        const fn = shaders[name];
        fn().then((module: any) => {
            setCurrent(module.default);
        });
    });

    mainFolder.open();
    lazyInit(current, shaderNames, tools as HTMLElement);
}
init();

type Info = {
    id: string;
    name: string;
    description: string;
};
function createInfo(config: any): Info {
    if (config.info) {
        return config.info;
    }
    return {
        id: 'unknow',
        name: 'unknow',
        description: '',
    };
}

function createShaderPassConfig(config: any): ShaderPassConfig[] {
    const shaderPassConfigs = new Array<ShaderPassConfig>();
    if (Array.isArray(config.renderpass)) {
        config.renderpass.forEach((pass: any, idx: number) => {
            if (pass.type === 'image') {
                shaderPassConfigs.push({
                    name: pass.name,
                    type: 'image',
                    code: pass.code,
                    inputs: createInputs(pass.inputs),
                    outputs: createOutputs(pass.outputs)
                });
            } else if (pass.type === 'common') {
                shaderPassConfigs.push({
                    name: pass.name,
                    type: 'common',
                    code: pass.code,
                    inputs: createInputs(pass.inputs),
                    outputs: createOutputs(pass.outputs)
                })
            } else if (pass.type === 'buffer') {
                shaderPassConfigs.push({
                    name: pass.name,
                    type: 'buffer',
                    code: pass.code,
                    inputs: createInputs(pass.inputs),
                    outputs: createOutputs(pass.outputs)
                })
            } else if (pass.type === 'sound') {
                shaderPassConfigs.push({
                    name: pass.name,
                    type: 'sound',
                    code: pass.code,
                    inputs: createInputs(pass.inputs),
                    outputs: createOutputs(pass.outputs)
                })
            }
            else {
                console.warn('not do it');
            }
            console.log(pass);
            // TODO: 其他配置以及output
        });
    }
    console.log(shaderPassConfigs)
    return shaderPassConfigs;
}

function createInputs(inputs: any): EffectPassInfo[] {
    const infos: EffectPassInfo[] = [];
    if (Array.isArray(inputs)) {
        inputs.forEach((input, idx) => {
            const channel = (input.hasOwnProperty('channel') ? input.channel : idx);
            const type = input.type;
            const sampler: Sampler = {
                filter: input.sampler?.filter || 'linear',
                wrap: input.sampler?.wrap || 'clamp',
                vflip: input.sampler?.vflip === 'true',
            };
            let src = '';
            if (input.type === 'texture') {
                const img = Images.find((it) => it.name === textureMap[input.id]);
                if (img) {
                    src = getAssetsUrl(img.url);
                }
                sampler.filter = input.sampler?.filter || 'mipmap';
                sampler.wrap = input.sampler?.wrap || 'repeat'
            }
            infos.push({
                channel,
                type,
                src,
                sampler
            });
        });
    }
    return infos;
}

function createOutputs(outputs: any) {
    const outputArr = new Array<{
        id: number
        channel: number
    }>();
    if (Array.isArray(outputs)) {
        if (outputs.length === 1) {
            const oid = outputs[0].id;
            if (oid === '4dXGR8') {
                outputArr.push({
                    channel: 0, id: 0
                })
            }
            else if (oid === '4dfGRr') {
                // main image 不需要
            }
            else {
                console.warn('无法识别的 id:', outputs[0].id);
            }
        } else if (outputs.length > 0) {
            console.warn('无法识别的 outputs:', outputs);
        }
    }

    return outputArr;
}

const KEY_当前选择 = '_current_shader';
const KEY_已查看列表 = '_visited_list';

function showShaderInfo(info: Info) {
}

function recordViewedShader(config: any) {
    const id = config.info.id;
    window.localStorage.setItem(KEY_当前选择, id);

    const listStr = window.localStorage.getItem(KEY_已查看列表) || '[]';
    const vSet = new Set<string>(JSON.parse(listStr));
    vSet.add(id);
    window.localStorage.setItem(KEY_已查看列表, JSON.stringify([...vSet]));
}

function lazyInit(gui: GUIController, nameToValue: Record<string, string>, dom: HTMLElement) {
    const list = document.createElement('div');
    dom.appendChild(list);
    list.style.display = 'flex';
    setTimeout(() => {
        try {
            const id = window.localStorage.getItem(KEY_当前选择);
            if (id && !gui.getValue()) {
                const name = (Names as any)[id] || id
                const value = nameToValue[name];
                if (value) {
                    gui.setValue(value);
                } else {
                    console.warn('lazyinit error: ', id);
                }
            }

            const listStr = window.localStorage.getItem(KEY_已查看列表) || '[]';
            const visitList = JSON.parse(listStr);
            const visitSet = new Set<string>();
            visitList.forEach((id: any) => {
                const name = (Names as any)[id] || id
                visitSet.add(nameToValue[name]);
            });
            Object.keys(nameToValue).forEach(key => {
                const value = nameToValue[key];
                if(!visitSet.has(value)) {
                    const div = document.createElement('button');
                    div.innerHTML = key;
                    list.appendChild(div);
                }
            })
        } catch (exp) {

        }
    }, 1000)
}

const textureMap: any = {
    XdX3Rn: 'Abstract1',
    '4dfGRn': 'London',
    XdfGRn: 'Stars',
    XsXGRn: 'Organic1',
    '4dX3Rn': 'Abstract2',
    '4dXGRn': 'RockTiles',
    Xsf3Rn: 'Nyancat',
    XsX3Rn: 'Organic2',
    Xsf3zn: 'RGBANoiseMedium',
    XsfGRn: 'Wood',
    XsBSR3: 'BlueNoise',
    XdXGzn: 'RGBANoiseSmall',
    '4sfGRn': 'Lichen',
    '4sXGRn': 'RustyMetal',
    '4dXGzn': 'GrayNoiseMedium',
    '4sf3Rr': 'Pebbles',
    Xdf3zn: 'Bayer',
    '4sf3Rn': 'GrayNoiseSmall',
    Xsf3Rr: 'Organic3',
    XdXGzr: 'Abstract3',
}

const volumeMap = {
    '4sfGRr': 'GreyNoise3D',
    XdX3Rr: 'RGBANoise3D',
}

const cubeMap = {
    XdX3zn: 'Basilica',
    '4dX3zn': 'BasilicaBlur',
    XsX3zn: 'Forest',
    XsfGzn: 'Gallery',
    '4sfGzn': 'GalleryB',
}