import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import vueJsx from "@vitejs/plugin-vue-jsx"

const resolve = (dir) => {
  return path.resolve(__dirname, dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({})
  ],
  resolve: {
    alias: {
      '@': resolve('src'),
      'components': resolve('src/components'),
      'pages': resolve('src/pages'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
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
