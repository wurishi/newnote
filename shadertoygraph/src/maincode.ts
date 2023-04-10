import ShaderToy from './shaderToy';
import Stats from 'stats.js';
import { GUI, GUIController } from 'dat.gui';
import { EffectPassInfo, Sampler, ShaderPassConfig } from './type';
import Names from './name';
import Images from './image';
import { getAssetsUrl } from './utils/proxy';

const configs = import.meta.glob('../export/*.json');

function init() {
    const stats = new Stats();
    document.body.appendChild(stats.dom);
    stats.dom.style.left = '';
    stats.dom.style.right = '300px';

    let shaderToy = new ShaderToy();
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
    };
    const current = mainFolder.add(guiData, 'current', shaderNames).name('shader').onChange(name => {
        const fn = shaders[name];
        fn().then((module: any) => {
            setCurrent(module.default);
        });
    });

    mainFolder.open();
    lazyInit(current);
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
                    outputs: []
                });
            }
            // TODO: 其他配置以及output
        });
    }
    // console.log(shaderPassConfigs)
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

const KEY_当前选择 = '_current_shader';
const KEY_已查看列表 = '_visited_list';

function showShaderInfo(info: Info) {
}

function recordViewedShader(config: any) {
    // console.log(config)
    // // config.info.id
    // console.log(configs)

    const id = config.info.id;
    window.localStorage.setItem(KEY_当前选择, id);

    const listStr = window.localStorage.getItem(KEY_已查看列表) || '[]';
    const vSet = new Set<string>(JSON.parse(listStr));
    vSet.add(id);
    window.localStorage.setItem(KEY_已查看列表, JSON.stringify([...vSet]));
}

function lazyInit(gui:GUIController) {

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