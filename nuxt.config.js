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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      { src: '//imasdk.googleapis.com/js/sdkloader/ima3.js' },
      { src: '/pixellot-web-sdk.js' }
    ]
  },

  router: {
    base: '/websdk-pano-demo/'
  },

  css: [],
  plugins: [],
  target: 'static',
  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    ['@nuxtjs/vuetify', { /* module options */ }]
  ],

  modules: ['@nuxtjs/axios'],

  axios: {},
  vuetify: {},

  build: {}
}
