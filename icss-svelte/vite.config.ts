import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { port, hmr, base } from './src/proxy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  server: {
    port,
    hmr,
  },
  base,
})
