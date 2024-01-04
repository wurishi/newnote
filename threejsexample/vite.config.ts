import {defineConfig} from 'vite'
import path from 'path'
import {port, hmr, base} from './src/proxy'

export default defineConfig({
  resolve: {
    alias:{
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port,
    hmr
  },
  base
})