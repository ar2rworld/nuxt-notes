import tailwindcss from "@tailwindcss/vite";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '~/assets/css/tailwind.css', '@/assets/css/main.css'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,    },
  ],
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@pinia/nuxt',
    'nuxt-toast',
    'nuxt-icon'
  ],
  icon: {
    serverBundle: {
      collections: ['uil']
    }
  },
  nuxtIcon: {
    size: '24px', // default <Icon> size applied
    class: '', // default <Icon> class applied
    aliases: {
      'nuxt': 'logos:nuxt-icon',
    }
  },
  vite: {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/back': {
          target: 'http://localhost:3010',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/back/, '/api'),
        },
      },
    },
  }
})