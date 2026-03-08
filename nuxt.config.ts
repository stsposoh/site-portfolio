import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2026-02-15',

  future: {
    compatibilityVersion: 4
  },

  devtools: {
    enabled: true
  },

  alias: {
    '~/data': fileURLToPath(new URL('./app/data', import.meta.url))
  },

  css: ['@/assets/scss/main.scss'],

  vite: {
    build: {
      cssCodeSplit: false
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          additionalData: `
            @use "~/assets/scss/utils/variables" as v;
            @use "~/assets/scss/utils/mixins" as m;
          `
        }
      }
    }
  }
})
