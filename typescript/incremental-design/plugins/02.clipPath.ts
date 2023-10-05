// nuxt wrapper for clip path plugin

import { App } from "vue"

import {Path, PathArray, Svg, SVG} from "@svgdotjs/svg.js"

/* a single SVG object to rule them all */
let svg: Svg
let path: Path

const getSvg = ():Svg => {
    if (!svg){
        svg = SVG()
    }
    return SVG()
}

const getPath = ():Path => {
    if(!path){
        path = getSvg().path()
    }
    return path
}

// don't re-parse paths unless absolutely necessary
let parsedPaths: Map<string, PathArray> = new Map()

/* remove stale keys from the parsedPaths */
const parsePaths = (path: [string, ...Array<string>]): [PathArray, ...Array<PathArray>] => {

    /* first delete the old keys */
    const deleteKeys: Array<string> = []

    let k = parsedPaths.keys().next()
    while(!k.done){
        if(!path.includes(k.value)) deleteKeys.push(k.value);
        k = parsedPaths.keys().next()
    }

    deleteKeys.forEach(key => parsedPaths.delete(key));

    /* then insert the new keys */
    return path.map(p => {
        if(!parsedPaths.has(p)){
            const a = getPath().plot(p)

            /* deep copy the path array so that we can toss out the original path object */
            // const pa = a.array().map(pc => pc.map(e => e)) as PathArray
            const pa = a.array().clone() as PathArray // todo: does this work??

            parsedPaths.set(p, pa)
        }
        return parsedPaths.get(p) as PathArray
    }) as [PathArray, ...Array<PathArray>]
    
}

const getFromBinding = (binding: { value: { path: [string, ...Array<string>]; interpolate: number } }) => {
    const path = [...binding.value.path]
    const interpolate = binding.value.interpolate

    if (interpolate < 0 || interpolate > path.length -1) throw new Error(`interpolate is out of range. Received ${interpolate}, should be between 0 and ${path.length -1} inclusive`)
    console.log(path, interpolate)
    return {path, interpolate}
}

const interpolatePaths = (p0: string, p1: string, weight: number): string => {
    const [pA0, pA1] = parsePaths([p0, p1])
    
    
    if (pA0.length === pA1.length && pA0.every((pathCommand, i) => pathCommand[0] = pA1[i][0])){
        const p = getPath()

        p.plot(pA0).animate(1).plot(pA1).step(weight) /* hijack animate to tween the path array */
        const pOut = p.array().map(pc => pc.join(" ")).join(",")
        p.timeline().finish()
        return pOut
    } else {
        throw new Error("paths with different numbers of points or different commands are not supported") // todo: IF actually needed, add in support
    }

}

/**
 * clipPathPlugin provides the v-clip-path directive
 * 
 * when v-clip-path is applied to an element, it applies the css property of `clip-path` to the element. It can also apply one of many clip paths to an element, and interpolate between them
 * 
 * use v-clip-path as follows:
 * 
 * ```vue
 *  
 *  <template>
 *      <div v-clip-path="{path, interpolate}"></div>
 *  </template>
 * 
 *  <script setup lang="ts">
 *      import {ref, Ref} from 'vue'
 *      import { Intersection } from '@incremental.design/vue3-plugin-clipPath'
 * 
 *      const path Ref<[string, ...Array<string>]> = ref(['M 0 0 H 100 V 100 H 0 V 0 Z'])
 *      const interpolate: Ref<number> = ref(0)
 *      
 *  </script>
 * ```
 * 
 * v-clip-path receives an object with the following properties:
 * 
 *  - path: an array of one or more strings, each of which is an SVG path. The provided SVG strings must be closed loops.
 * 
 *  - interpolate: a number between 0 and the length of the array - 1 provided to path. interpolate specifies which path string to use, or whether to use a blend of two or more path strings. For example, if two paths are provided, and interpolate is 0, then the first path will be used. If it is 1, the second path will be used. If it is 0.5, then an interpolation of both paths will be used.
 */
const clipPathPlugin = {
    install(app: App){
        app.directive('clipPath' /*becomes 'v-clip-path' */, (el, binding) => { /* using function shorthand: see https://vuejs.org/guide/reusability/custom-directives.html#function-shorthand */
            if(el === null) return; // todo: consider using a refcount of els so that svg and path can be destroyed when nothing is left. only do this before releasing a library that other people actually use
            const {path, interpolate} = getFromBinding(binding)
            const f = Math.floor(interpolate)
            const p = `path('${interpolate === f ? path[interpolate] : interpolatePaths(path[f], path[Math.ceil(interpolate)], interpolate - f)}')`
            el.style.setProperty('-webkit-clip-path',p) /* needed for safari as of 10/2023 */
            el.style.setProperty('clip-path',p)
        })
    }
}


export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(clipPathPlugin)
})