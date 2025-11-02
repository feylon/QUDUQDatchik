import tailwindcss from "@tailwindcss/vite";


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
  ],
  devtools: { enabled: false },
  css: ['./app/assets/css/main.css',
 ],
 ssr : false,
  runtimeConfig: {
    // Private keys are only available on the server
    apiSecret: '123',

    // Public keys that are exposed to the client
    public: {
      apiBase: process.env.YANDEX_API || '/api',
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  ui : {
      colorMode: false

  }
})