export const viewportWidthInjectable = Symbol('windowWidth') as InjectionKey<Ref<number>>;
export const viewportHeightInjectable = Symbol('windowHeight') as InjectionKey<Ref<number>>;
export const isDarkModeInjectable = Symbol('isDarkMode') as InjectionKey<Ref<boolean>>;

export const scrollXInjectable = Symbol('scrollX') as InjectionKey<Ref<number>>
export const scrollYInjectable = Symbol('scrollY') as InjectionKey<Ref<number>>

export type unobserveCb = () => void
export type observeCb = (entry: IntersectionObserverEntry) => void

export const observeIntersectionInjectable = Symbol('observeIntersectionInjectable') as InjectionKey<(el: HTMLElement, cb: observeCb) => unobserveCb>

/* 
we aren't using https://vueuse.org/shared/createInjectionState/ because although we need to inject values, those values don't have to be stateful
*/ 

// composables is for any typescript functions that you use in vue components. technically a 'composable' is a typescript that makes use of the vue api, but you could have typescript that uses no api in here as well. if you want to deliniate between the two, use 'utils' for pure typescript

// make sure you either run `nuxi prepare` or run pnpm i after updating a composable, so that nuxt can generate import paths for the composable

// you can use named or default export

// see: https://nuxt.com/docs/guide/directory-structure/composables