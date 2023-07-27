// see: https://nuxt.com/docs/guide/going-further/custom-routing#using-router-config

import type { RouterConfig } from '@nuxt/schema'
import type { RouteLocationNormalized, RouteLocationNormalizedLoaded, RouterScrollBehavior } from '.nuxt/vue-router'


export default <RouterConfig> {
    scrollBehavior( /* note that nuxt is smart enough to not use scrollBehavior on server side, so we don't have to guard for it */
        to: RouteLocationNormalized,
        from: RouteLocationNormalizedLoaded, /* should we use from ?? */
        savedPosition: {
            behavior ?: ScrollBehavior,
            top: number,
            left: number
        } | null
    ){
        if(savedPosition) return savedPosition
        if(to.hash) return {
            el: to.hash, /* magic line that enables scrolling to a hash in a route */
            behavior: 'smooth'
        }
    }
}