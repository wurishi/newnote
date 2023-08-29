export const host = '124.221.113.125:8080';

export const port = 22223;

export const base = `/proxy/${port}`;

export const hmr = base ? {
    host: host + base
} : undefined;