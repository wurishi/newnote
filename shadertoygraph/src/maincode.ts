import ShaderToy from './shaderToy';
import Stats from 'stats.js';
import { GUI, GUIController } from 'dat.gui';
import { EffectPassInfo, Sampler, ShaderPassConfig } from './type';
import Names from './name';
import Images, { getMusic, getVolume } from './image';
import { getAssetsUrl } from './utils/proxy';
import createMediaRecorder from './utils/mediaRecorder';
import { requestFullScreen } from './utils/index'

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
  Object.keys(configs).forEach((key) => {
    const arr = key.split('/');
    const name = arr.at(-1)!.split('.')[0];
    const code = name.split('_')[0];
    shaderNames[(Names as any)[code] || name] = name;
    shaders[name] = configs[key];
  });
  let prevGUI: GUI;
  const setCurrent = (config: any) => {
    const info = createInfo(config);
    const renderpass = createShaderPassConfig(config);

    showShaderInfo(info, tools as HTMLElement);
    shaderToy.newEffect(renderpass, musicCallback);
    recordViewedShader(config);

    if (prevGUI) {
      gui.removeFolder(prevGUI)
    }
    prevGUI = gui.addFolder(`Shader(${info.id})配置`);
    createUIWithShader(setCurrent, updateCurrentConfig, config, prevGUI);
  };
  const updateCurrentConfig = (config: any) => {
    const renderpass = createShaderPassConfig(config);
    shaderToy.newEffect(renderpass, musicCallback);
  }
  let _gainControl: GUIController;
  const current = mainFolder
    .add(guiData, 'current', shaderNames)
    .name('shader')
    .onChange((name) => {
      const fn = shaders[name];
      fn().then((module: any) => {
        setCurrent(module.default);
      });
      _gainControl && _gainControl.setValue(0);
    });

  const mainUI = createMainUI(mainFolder, shaderToy);
  _gainControl = mainUI.gainControl;

  mainFolder.open();
  lazyInit(current, shaderNames, tools as HTMLElement);
}
init();

function musicCallback(wave: Uint8Array, passID: number) { }

function createMainUI(root: GUI, st: ShaderToy) {
  let mediaRecorder: any = undefined
  let recordControl: GUIController;
  const uiData = {
    gain: 0,
    record() {
      if (mediaRecorder === undefined) {
        mediaRecorder = createMediaRecorder((isRecording) => {
          if (isRecording) {
            recordControl!.name('结束录制')
          } else {
            recordControl!.name('开始录制')
          }
        }
          , st.canvas);
      }
      if (mediaRecorder) {
        if (mediaRecorder.state === 'inactive') {
          mediaRecorder.start();
        } else {
          mediaRecorder.stop();
        }
      }
    },
    fullScreen() {
      requestFullScreen(st.canvas);
      st.canvas.focus();
    }
  };

  const gainControl = root
    .add(uiData, 'gain', 0, 1, 0.1)
    .onChange((v) => {
      st.setGainValue(v);
    })
    .name('音量');

  recordControl = root.add(uiData, 'record').name('开始录制')

  root.add(uiData, 'fullScreen').name('全屏');
  return {
    gainControl,
    recordControl
  };
}

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
          outputs: createOutputs(pass.outputs),
        });
      } else if (pass.type === 'common') {
        shaderPassConfigs.push({
          name: pass.name,
          type: 'common',
          code: pass.code,
          inputs: createInputs(pass.inputs),
          outputs: createOutputs(pass.outputs),
        });
      } else if (pass.type === 'buffer') {
        shaderPassConfigs.push({
          name: pass.name,
          type: 'buffer',
          code: pass.code,
          inputs: createInputs(pass.inputs),
          outputs: createOutputs(pass.outputs),
        });
      } else if (pass.type === 'sound') {
        shaderPassConfigs.push({
          name: pass.name,
          type: 'sound',
          code: pass.code,
          inputs: createInputs(pass.inputs),
          outputs: createOutputs(pass.outputs),
        });
      } else {
        console.warn('not do it');
      }
      // console.log(pass);
      // TODO: 其他配置以及output
    });
  }
  console.log(config, shaderPassConfigs);
  return shaderPassConfigs;
}

function createInputs(inputs: any): EffectPassInfo[] {
  const infos: EffectPassInfo[] = [];
  if (Array.isArray(inputs)) {
    inputs.forEach((input, idx) => {
      const channel = input.hasOwnProperty('channel') ? input.channel : idx;
      let type = input.type;
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
        } else {
          console.log('未找到img', input)
        }
        sampler.filter = input.sampler?.filter || 'mipmap';
        sampler.wrap = input.sampler?.wrap || 'repeat';
      } else if (input.type === 'music') {
        const music = getMusic(input.id);
        src = getAssetsUrl(music);
      } else if (input.type === 'musicstream') {
        type = 'music';
        src = getAssetsUrl(getMusic(input.filepath));
      } else if (input.type === 'buffer') {
        src = inputAndOutputID(input.id) + '';
      } else if (input.type === 'cubemap') {
        const cubemapUrl = cubeMap[input.id]
        if (cubemapUrl) {
          src = cubemapUrl
        } else {
          console.log('未找到img', input)
        }
      } else if (input.type === 'keyboard') {
      } else if (input.type === 'volume') {
        const volumn = getVolume(volumeMap[input.id])
        if (volumn) {
          src = getAssetsUrl(volumn.url)
        } else {
          console.log('未找到volumn', input)
        }
      }
      else {
        console.log('未处理的input', input);
      }
      infos.push({
        channel,
        type,
        src,
        sampler,
      });
    });
  }
  return infos;
}

function inputAndOutputID(key: string): number {
  switch (key) {
    case '4dXGR8':
      return 0;
    case 'XsXGR8':
      return 1;
    case '4sXGR8':
      return 2;
    case 'XdfGR8':
      return 3;
  }
  console.log('未知的input/output', key);
  return 0;
}

function createOutputs(outputs: any) {
  const outputArr = new Array<{
    id: number;
    channel: number;
  }>();
  if (Array.isArray(outputs)) {
    if (outputs.length === 1) {
      const oid = outputs[0].id;
      if (oid === '4dfGRr') {
        // main image 不需要
      } else {
        outputArr.push({
          channel: 0,
          id: inputAndOutputID(oid),
        });
      }
    } else if (outputs.length > 0) {
      console.warn('无法识别的 outputs:', outputs);
    }
  }

  return outputArr;
}

const KEY_当前选择 = '_current_shader';
const KEY_已查看列表 = '_visited_list';

function showShaderInfo(info: Info, rootDOM: HTMLElement) {
  let div: HTMLDivElement = rootDOM.querySelector('#info') as HTMLDivElement;
  if (!div) {
    div = document.createElement('div');
    div.id = 'info';
    div.style.fontSize = '12px';
    rootDOM.appendChild(div);
  }
  div.innerHTML = `<a href="https://www.shadertoy.com/view/${info.id}" target="_blank">${info.id} ${info.name}</a>
  <br />
  ${(info.description + '').split('\n').join('<br />')}`
}

function recordViewedShader(config: any) {
  const id = config.info.id;
  window.localStorage.setItem(KEY_当前选择, id);

  const listStr = window.localStorage.getItem(KEY_已查看列表) || '[]';
  const vSet = new Set<string>(JSON.parse(listStr));
  vSet.add(id);
  window.localStorage.setItem(KEY_已查看列表, JSON.stringify([...vSet]));
}

function createUIWithShader(setConfig: any, updateConfig: any, config: any, gui: GUI) {
  const originalConfigStr = JSON.stringify(config);
  if (Array.isArray(config.renderpass)) {
    config.renderpass.forEach((pass: {
      code: string;
      inputs: any[];
      name: string;
      type: string;
    }, passIndex: number) => {
      const passFolder = gui.addFolder(pass.name);
      if (Array.isArray(pass.inputs) && pass.inputs.length > 0) {
        createInputsUI(updateConfig, config, passFolder, passIndex) // config.renderpass[passIndex].inputs[j]
      }
      if (pass.type === 'image') {
        passFolder.open();
      }
    })
  }
  const uiData = {
    reset() {
      setConfig(JSON.parse(originalConfigStr))
    }
  }
  gui.add(uiData, 'reset').name('恢复为初始化配置');
  gui.open();
}

const inputTypeList = ['texture', 'buffer']

function createInputsUI(updateConfig:any, config: any, root: GUI, passIndex: number) {
  // config.renderpass[passIndex].inputs[j]
  const changeConfig = (inputIndex: number, part: any) => {
    const input = config.renderpass[passIndex].inputs[inputIndex]
    Object.keys(part).forEach(key => {
      const value = part[key]
      if(value) {
        input[key] = value
      } else {
        delete input[key]
      }
    })
    updateConfig(config)
  }

  config.renderpass[passIndex].inputs.forEach((input: {
    sampler: any;
    channel: number;
    type: string;
    id: string;
  }, i: number) => {
    console.log(input)
    const folder = root.addFolder('channel' + input.channel);
    const uiData = {
      type: input.type,
      texture: input.id,
      channel: input.id,
    };
    folder.add(uiData, 'type', inputTypeList).onChange(type => {
      if (type === 'texture') {

      } else if(type === 'buffer') {

      }
    })
    if(input.type === 'texture') {
      folder.add(uiData, 'texture', reverseKeyValue(textureMap)).onChange(texture => {
        changeConfig(i, {
          id: texture
        })
      })
    }
    else if(input.type === 'buffer') {
      // folder.add(uiData, 'channel', )
    }
  })
}

function reverseKeyValue(obj:any) {
  const newObj: any = {}
  Object.keys(obj).forEach(key => {
    const value = obj[key]
    newObj[value] = key
  })
  return newObj
}

function lazyInit(
  gui: GUIController,
  nameToValue: Record<string, string>,
  rootDOM: HTMLElement
) {
  const list = document.createElement('div');
  rootDOM.appendChild(list);
  list.style.display = 'flex';
  list.style.flexWrap = 'wrap';
  list.style.gap = '5px';

  const div = document.createElement('button');
  div.innerHTML = '全部 visited';
  list.appendChild(div);
  div.addEventListener('click', () => {
    rootDOM.removeChild(list);
    const listStr = window.localStorage.getItem(KEY_已查看列表) || '[]';
    const vSet = new Set<string>(JSON.parse(listStr));
    Object.values(nameToValue).forEach((v) => {
      const arr = v.split('_');
      vSet.add(arr[0]);
    });
    window.localStorage.setItem(KEY_已查看列表, JSON.stringify([...vSet]));
  });

  const clickHandler = (evt: Event) => {
    const t: any = evt.target!;
    const target = t as EventTarget & { id: string };
    gui.setValue(target.id);
    target.removeEventListener('click', clickHandler);
    list.removeChild(t);
  };
  setTimeout(() => {
    try {
      const id = window.localStorage.getItem(KEY_当前选择);
      if (id && !gui.getValue()) {
        const name = (Names as any)[id] || id;
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
        const name = (Names as any)[id] || id;
        visitSet.add(nameToValue[name]);
      });
      Object.keys(nameToValue).forEach((key) => {
        const value = nameToValue[key];
        if (!visitSet.has(value)) {
          const div = document.createElement('button');
          div.id = value;
          div.innerHTML = key;
          list.appendChild(div);
          div.addEventListener('click', clickHandler);
        }
      });
    } catch (exp) { }
  }, 1000);
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
  '4df3Rr': 'Organic4',
  '4dXGzr': 'Font1'
};

const volumeMap: any = {
  '4sfGRr': 'GreyNoise3D',
  XdX3Rr: 'RGBANoise3D',
};

const cubeMap: any = {
  XdX3zn: 'Basilica',
  '4dX3zn': 'BasilicaBlur',
  XsX3zn: 'Forest',
  XsfGzn: 'Gallery',
  '4sfGzn': 'GalleryB',
  '4sX3zn': 'ForestBlur'
};
