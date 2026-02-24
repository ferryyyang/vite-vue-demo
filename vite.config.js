import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      // 选项一：最简单的写法（字符串简写）
      // '/api': 'http://localhost:8080',

      // 选项二：详细配置（推荐）
      '/cwca-api': {
        // 1. 目标后端服务器地址
        target: 'http://cwca.npadata.cn/', // 例如 Java/Node 后端地址
        // 2. 是否改变请求头中的 Origin，模拟跨域请求
        changeOrigin: true,
        // 3. 路径重写：将请求路径中的 `/api` 替换为空
        // 例如：浏览器请求 /api/user -> 实际转发到 http://localhost:8080/user
        rewrite: (path) => path.replace(/^\/cwca-api/, ''),
        
        // 4. (可选) 如果是 HTTPS 接口，且证书不安全，需要配置
        // secure: false,
      },
      
      // (可选) 配置 WebSocket 代理
      // '/socket.io': {
      //   target: 'ws://localhost:3001',
      //   ws: true,
      // },
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})