import { defineConfig } from 'vite';
import base from './src/utils/proxy'

export default defineConfig({
    server: {
        port: 5201,
    },
    base
});