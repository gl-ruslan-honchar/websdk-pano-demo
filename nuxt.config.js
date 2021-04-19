const isDev = process.env.NODE_ENV === 'development'

export default {
  head: {
    titleTemplate: '%s',
    title: 'sdk-demo',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/websdk-pano-demo/zoom-icon.png' },
    ],
    script: [
      { src: '//imasdk.googleapis.com/js/sdkloader/ima3.js' },
      { src: isDev ? 'http://localhost:8080/pixellot-web-sdk.js' : '/websdk-pano-demo/pixellot-web-sdk.js' }
    ]
  },

  router: {
    base: '/websdk-pano-demo/'
  },

  css: ['~/assets/main'],
  plugins: [
    '~/plugins/messages'
  ],

  ssr: false,
  target: 'static',
  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    ['@nuxtjs/vuetify', { /* module options */ }]
  ],

  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },

  modules: ['@nuxtjs/axios'],

  axios: {},
  vuetify: {},

  build: {}
}
