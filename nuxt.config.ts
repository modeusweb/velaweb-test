// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-07',
  // ssr: false,
  devtools: { enabled: false },
  modules: ['@pinia/nuxt', '@nuxtjs/google-fonts', '@nuxt/image'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      title: 'Vela Test',
      meta: [
        {
          'http-equiv': 'x-ua-compatible',
          content: 'IE=edge',
        },
        {
          name: 'format-detection',
          content: 'telephone=no, address=no, email=no, date=no, url=no',
        },
        {
          name: 'theme-color',
          content: '#5E5E5E',
        },
        {
          name: 'author',
          content: 'a.nikonorov',
        },
        {
          name: 'description',
          content: 'Тестовое задание для  ООО «ВЭЛА»',
        },
        {
          name: 'keywords',
          content: ' ООО «ВЭЛА», тестовое задание, nuxt',
        },
      ],
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  router: {
    options: {
      linkActiveClass: 'active',
      linkExactActiveClass: 'active',
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            $enable-grid-classes: false;
            $enable-cssgrid: true;
            @import "bootstrap/scss/bootstrap-grid.scss";
            @import "~/assets/scss/_variables.scss";
            @import "~/assets/scss/_mixins.scss";
          `,
        },
      },
    },
  },
  css: ['~/assets/scss/main.scss'],
  googleFonts: {
    display: 'swap',
    useStylesheet: true,
    inject: true,
    preload: true,
    download: true,
    families: {
      Raleway: {
        wght: [400, 500, 600, 700],
      },
    },
  },
  buildModules: ['@nuxt/typescript-build'],
});
