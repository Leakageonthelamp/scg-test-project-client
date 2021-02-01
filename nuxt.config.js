import colors from 'vuetify/es5/util/colors';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - client',
    title: 'Drinky',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/app-logo.png' }],
  },

  server: {
    port: 8080,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/vue2-google-maps', ssr: true }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'vue-sweetalert2/nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  auth: {
    redirect: {
      login: '/admin',
    },
    strategies: {
      local: {
        token: {
          property: 'token',
        },
        endpoints: {
          login: {
            url:
              process.env.NODE_ENV === 'production'
                ? 'https://scg-test-project-server.herokuapp.com/api/admin/login'
                : 'http://localhost:3000/api/admin/login',
            method: 'post',
            propertyName: 'token',
          },
          logout: {
            url:
              process.env.NODE_ENV === 'production'
                ? 'https://scg-test-project-server.herokuapp.com/api/admin/logout'
                : 'http://localhost:3000/api/admin/logout',
            method: 'delete',
          },
          user: {
            url: process.env.NODE_ENV === 'production'
            ? 'https://scg-test-project-server.herokuapp.com/api/'
            : 'http://localhost:3000/api/',
            methods: 'get'
          }
        },
      },
    },
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ['vue2-google-maps'],
    transpile: [/^vue2-google-maps($|\/)/],
  },
};
