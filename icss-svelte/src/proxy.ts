export const host = '124.221.113.125:8080';

export const port = 11111;

export const base = `/proxy/${port}/`;

export const hmr = base ? {
    host: host + base
} : undefined;

export function getAssetsUrl(url:string):string {
    return base + url;
}