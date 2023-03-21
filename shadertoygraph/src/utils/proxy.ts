const base = '/proxy/22222';

export default base;

export function getAssetsUrl(url:string):string {
    return base + url;
}

// 加载 glsl 部分需要修改

// const modules = import.meta.glob('./glsl/3l23Rh.glsl', {as: 'raw'});