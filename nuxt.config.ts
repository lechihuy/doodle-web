// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    public: {
      appName: 'Doodle',
      baseApiUrl: process.env.NUXT_PUBLIC_BASE_URL ? process.env.NUXT_PUBLIC_BASE_URL : 'https://api.doodlevn.xyz'
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
    '~/plugins/scroll-top.ts',
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
  