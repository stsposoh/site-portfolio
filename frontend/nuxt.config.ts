const apiUrl = process.env.NUXT_PUBLIC_API_URL || 'http://localhost:1337'
const siteUrl = 'https://posokhov.com'

export default defineNuxtConfig({
  compatibilityDate: '2026-02-15',

  runtimeConfig: {
    public: {
      apiUrl,
      // Empty for the static build, where uploads are copied next to the pages
      mediaUrl: process.env.NUXT_PUBLIC_MEDIA_URL ?? apiUrl,
      siteUrl
    }
  },

  future: {
    compatibilityVersion: 4
  },

  devtools: {
    enabled: true
  },

  app: {
    head: {
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ],
      meta: [{ name: 'theme-color', content: '#000000' }]
    }
  },

  modules: ['nuxt-strapi-blocks-renderer', '@nuxtjs/i18n'],

  i18n: {
    strategy: 'prefix_except_default',
    baseUrl: siteUrl,
    defaultLocale: 'uk',
    locales: [
      { code: 'uk', language: 'uk-UA', name: 'Українська' },
      { code: 'en', language: 'en-US', name: 'English' },
      { code: 'ru', language: 'ru-RU', name: 'Русский' }
    ],
    detectBrowserLanguage: false
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
