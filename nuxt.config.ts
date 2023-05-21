// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    public: {
      appName: 'Doodle',
      baseApiUrl: 'http://127.0.0.1:8000'
    },
  },
  modules: [
    [
      'nuxt-swiper',
      {
        
      }
    ],
    '@nuxt/image-edge',
    'nuxt-headlessui',
    'nuxt-icon',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', 'acceptHMRUpdate'],
      },
    ],
  ],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [
    '~/plugins/lodash.ts',
    '~/plugins/error-global.ts',
    '~/plugins/axios.ts',
    '~/plugins/moment.ts',
  ],
  imports: {
    dirs: [
      'constants',
      'layouts'
    ]
  }
})
  