// const base = '/proxy/5201'; // codeserver需要指定一个proxy，默认情况空字符串即可
const base = '';

export default base;

export function getAssetsUrl(url:string):string {
    return base + url;
}