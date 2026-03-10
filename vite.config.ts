import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@composables': resolve(__dirname, './src/composables'),
      '@types': resolve(__dirname, './src/types'),
      '@theme': resolve(__dirname, './src/theme'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueForge',
      fileName: (format) => {
        const ext = format === 'es' ? 'mjs' : 'js'
        return `index.${ext}`
      },
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        // Emit CSS as separate file
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'style.css'
          }
          return assetInfo.name || ''
        },
      },
    },
  },
})
