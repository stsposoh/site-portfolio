export default defineNuxtConfig({
  compatibilityDate: '2026-02-15',
  
  future: {
    compatibilityVersion: 4
  },

  devtools: { 
    enabled: true 
  },

  css: ['@/assets/scss/main.scss'],

  vite: {
    build: {
      cssCodeSplit: false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
          additionalData: `
            @use "~/assets/scss/utils/_mixins" as *;
            @use "~/assets/scss/utils/_variables" as *;
          `,
        },
      },
    },
  },
})
