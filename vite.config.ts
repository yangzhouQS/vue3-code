/// <reference types="vitest" />
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import vueJsx from "@vitejs/plugin-vue-jsx";
import {visualizer} from 'rollup-plugin-visualizer';
import UnoCSS from 'unocss/vite';

const resolve = (dir) => {
  return path.resolve(__dirname, dir)
}


// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    visualizer({open: false}),
    // UnoCSS(),
    vueJsx({}),
  ],
  define: {
    'process.env': Object.assign({}, process.env),
    global: 'window'
  },
  resolve: {
    alias: {
      // '@': resolve('src'),
      // 'components': resolve('src/components'),
      // 'pages': resolve('src/pages'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  build: {
    assetsDir: 'public',
    outDir: 'dist',
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.toString().split("node_modules/")[1].split("/")[0].toString();
          }
        }
      },
      plugins: [
        // globals
      ],
    },
  },
  server: {
    // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
    host: "0.0.0.0",
    // host: "127.0.0.1",
    port: 3333,
    // open: viteEnv.VITE_OPEN,
    cors: true,
    strictPort: true,
    // 跨域代理配置
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  },
})
