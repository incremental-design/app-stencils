// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    /* from typescript/vue3/vite.config.ts */ 
    build: {
      cssCodeSplit: true,
    },
    css: {
      modules: {
        localsConvention: 'camelCaseOnly' 
      }
    },
  },
  modules: ['@vueuse/nuxt']
})

/**
 * what does this file do??
 * 
 * see https://nuxt.com/docs/api/configuration/nuxt-config for all options
 * 
 * options can be set per-environment i.e.
 *  $production: { ... } 
 *  $development: { ... }
 *
 * environment VARIABLES:
 *  - can be made available to server-side only, or server and client side.
 *  - stuff in 'public' is client side
 * 
 * runtimeConfig: {
 *  secret: 'abcd",
 *  public: {
 *    notSecret: 'efg'
 *  }
 * }
 * 
 * make sure you don't actually commit secrets into runtime config. use .env file:
 * e.g.
 * secret=verysecrettoken
 * 
 * there are also build-time env vars. these env vars affect the way the app is built, but not how it's run.
 * 
 * access vars in the build toolchain and runtime with 'useNuxtConfig()'
 * 
 * if this configures nuxt, why is 'runtimeConfig' in here?
 * 
 * 
 * shove the vite config object in the 'vite' key
 * e.g.
 *  vite: {...} // the same object, functions and all, that would be in viteConfig
 * 
 * enable experimental vue features with the 'vue' key
 * e.g.
 *  vue: {...} // see: https://nuxt.com/docs/getting-started/configuration#enabling-experimental-vue-features
 */

/**
 * nuxt.config.ts configures NUXT itself.
 * 
 * add in an app.config.ts e.g.
 * 
 * export default defineAppConfig({
 * ...
 * })
 * 
 * access vars in the app runtime with 'useAppConfig'
 * stick whatever objects you want to be available across the app at runtime. Note that these values will be reactive. they're just going to be dropped in as an object that will be accessed with 'useAppConfig'
 * 
 * don't put stuff that should only live on server in here (e.g. api keys). put that stuff in runtime config
 * 
 * note, you don't have to have an app.config.ts. If you don't have too many env vars, or you prefer to pass state in with pinia, you can just use the 'runtimeConfig' section of nuxt config
 */

/**
 * by the way, nuxt has some concept of 'layers' ... not sure what those are, yet. but fwiw layers can add or modify app config??
 */