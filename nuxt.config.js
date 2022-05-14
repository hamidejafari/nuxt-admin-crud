import colors from 'vuetify/es5/util/colors'

export default {
  ssr: true,

  head: {
    titleTemplate: '%s - my-proj',
    title: 'my-proj',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '~/assets/custom.css'
  ],

  plugins: [
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  axios:{
    baseURL: process.env.API_URL
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          global: true,
          // required: true,
          type: 'Bearer'
        },
        endpoints: {
          login:{
            url:"/api/login",method:"post",propertyName:"token"
          },
          logout:{
            url:"/api/admin/logout",method:"get"
          },
          user:{
            url:"/api/admin/user",method:"get",propertyName:"user"
          }
        },
        tokenType:'bearer'
      }
    }
  },

  router: {
    middleware: ['auth']
  },
  env: {
    hey: process.env.API_URL
},

  

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: "#6200ea", // #E53935
          secondary: "#00dc82", // #FFCDD2
          accent: colors.indigo.base, // #3F51B5,
        },
      },
    },
    rtl:true
  },

  build: {
    extractCSS: true
  }
}
