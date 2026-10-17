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

  modules: ['nuxt-strapi-blocks-renderer', '@nuxtjs/i18n'],

  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'uk',
    locales: [
      { code: 'uk', language: 'uk-UA', name: 'Українська' },
      { code: 'en', language: 'en-US', name: 'English' },
      { code: 'ru', language: 'ru-RU', name: 'Русский' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
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
