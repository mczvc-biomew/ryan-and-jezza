// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  srcDir: 'src/',
  modules: ['@unocss/nuxt', '@nuxtjs/i18n', '@vueuse/nuxt', '@nuxtjs/mdc'],
  css: [ '~/assets/css/fonts.css' ],
  postcss: {
    plugins: {
       tailwindcss: {},
       autoprefixer: {},
    },
  },
  unocss: {
    attributify: true,
    icons: true,
    components: false,
    shortcuts: [
      ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ],
  },
  devServer: {
    port: 3012
  },
  generate: {
    nojekyll: true,
    fallback: '404.html',
  },
  ssr: false,
  target: "static",
})