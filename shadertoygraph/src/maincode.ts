import ShaderToy from './shaderToy';
import Stats from 'stats.js';
import { GUI } from 'dat.gui';
import { ShaderPassConfig } from './type';
import Names from './name';

const configs = import.meta.glob('../export/*.json');

function init() {
    console.log(configs);
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

        shaderToy.newEffect(renderpass);
    };
    mainFolder.add(guiData, 'current', shaderNames).name('shader').onChange(name => {
        const fn = shaders[name];
        fn().then((module: any) => {
            setCurrent(module.default);
        });
    });

    mainFolder.open();
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
                    inputs: [],
                    outputs: []
                });
            }
            // TODO: 其他配置以及output
        });
    }
    return shaderPassConfigs;
}