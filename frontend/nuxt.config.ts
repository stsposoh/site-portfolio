export default defineNuxtConfig({
  compatibilityDate: '2026-02-15',

  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:1337'
    }
  },

  future: {
    compatibilityVersion: 4
  },

  devtools: {
    enabled: true
  },

  modules: ['nuxt-strapi-blocks-renderer'],

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
