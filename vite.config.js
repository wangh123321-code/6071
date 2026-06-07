import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `
          @use "@/styles/variables" as *;
          @use "@/styles/mixins" as *;
        `
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5174,
    hot: true
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('vue') && !id.includes('vue-chartjs') && !id.includes('vue-router')) {
              return 'vue-vendor'
            }
            if (id.includes('pinia')) {
              return 'vue-vendor'
            }
            if (id.includes('vue-router')) {
              return 'router-vendor'
            }
            if (id.includes('chart.js') || id.includes('vue-chartjs')) {
              return 'chart-vendor'
            }
            if (id.includes('axios')) {
              return 'axios-vendor'
            }
            return 'vendor'
          }
        }
      }
    }
  }
})
