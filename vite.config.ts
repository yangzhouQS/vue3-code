/// <reference types="vitest" />
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import vueJsx from "@vitejs/plugin-vue-jsx"
import UnoCSS from 'unocss/vite';
import externalGlobals from "rollup-plugin-external-globals";
import {autoComplete, Plugin as importToCDN} from "vite-plugin-cdn-import";

const resolve = (dir) => {
  return path.resolve(__dirname, dir)
}

// 全局对象
let globals = externalGlobals({
  vue: "Vue",
  // vuex: "Vuex",
  // vueRouter: "VueRouter",
  // "element-plus": "element"
})


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // globals,
    // UnoCSS(),
    vueJsx({}),
    importToCDN({
      modules: [
        /*autoComplete('vue'),
        {
          name:"vue",
          var:"Vue",
          path:'./vue.global.js'
        }*/
      ]
    })
  ],
  test: {
    /* globals: true,
     // 配置测试环境，因为测试是在node下进行的，所以需要模拟浏览器环境，按照jsdom和happydom都是可以的
     environment: 'jsdom',
     testTransformMode: {
       web: [/\.[jt]sx$/]
     }*/
  },
  define: {
    'process.env': Object.assign({}, process.env)
  },
  resolve: {
    alias: {
      '@': resolve('src'),
      'components': resolve('src/components'),
      'pages': resolve('src/pages'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  build: {
    rollupOptions: {
      external: ['vue'],
      output:{
        globals: {
          vue: 'Vue',
        },
      },
      plugins: [
        // globals
      ],
    },
  },
  server: {
    // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
    // host: "0.0.0.0",
    host: "127.0.0.1",
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
