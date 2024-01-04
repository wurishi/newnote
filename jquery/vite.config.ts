import path from 'path';
import { defineConfig } from 'vite';
import { port, hmr, base } from './src/proxy';

export default defineConfig({
    server: {
        port,
        hmr: false,
        watch: {
            usePolling: true,
        }
    },
    base,
    build: {
        rollupOptions: {
            input: {
                index: path.resolve(__dirname, 'index.html'),
                ready: path.resolve(__dirname, 'ready.html'),
                name: path.resolve(__dirname, 'name.html'),
            },
        }
    }
})