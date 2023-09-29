/// <reference types="vitest" />
// import {defineConfig} from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import {defineConfig} from 'vite'

export default defineConfig({
  plugins: [Vue()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
