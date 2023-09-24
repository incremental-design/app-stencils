// nuxt wrapper for intersection plugin

import { Intersection } from "composables/useIntersect"
import { App } from "vue"

/* unobserve an element, and once it is unobserved, get its scroll container */
type unobserveFn = () => void

let globalScrollContainer: HTMLElement | null = null /* will default to window */
let intersectionObservers: WeakMap<HTMLElement | Window, IntersectionObserver> = new WeakMap() /* for a given container, get its intersection observer */
let intersectionObservedEls: WeakMap<IntersectionObserver, Array<HTMLElement>> = new WeakMap() /* for a given intersection observer, get the els it's observing */
let elIntersectionUnobserve: WeakMap<HTMLElement, unobserveFn> = new WeakMap() /* for a given observed element, get a callback that unobserves the element */
let elIntersectionCallback: WeakMap<Element, {
    i: Intersection,
    cb: (i: Intersection) => void
}> = new WeakMap() /* for a given observed element, get the intersection object and the element's callback */

let scrollHandlers: WeakMap<HTMLElement | Document, () => void> = new WeakMap() /* for a given container, get its scroll handler */
let scrollObservedEls: WeakMap<HTMLElement | Document, Array<HTMLElement>> = new WeakMap() /* for a given container, get the elements that have opted into update on scroll */
let scrollObservedNotIntersectingEls: WeakMap<HTMLElement | Document, Array<HTMLElement>> = new WeakMap() /* for a given container, add elements that have opted into update on scroll, but are not intersecting, and remove elements that have opted into update on scroll, and ARE intersecting */

const getCenter = (x: number, y: number, width: number, height: number) => {
    return {
        x: (x + width) / 2,
        y: (y + height) / 2
    }
}

let resizeObserver: ResizeObserver
let resizeObserverCount = 0
const observeResize = (el: HTMLElement) => {
    if(!resizeObserver) resizeObserver = new ResizeObserver((entries) => {
       entries.forEach(entry => {
        const iCb = elIntersectionCallback.get(entry.target)
        if(!iCb){
            /* check if el is actually a container */
            const els = scrollObservedEls.get(el)
            if(!els || els.length === 0) return;
            els.forEach(e => {
                const iCb = elIntersectionCallback.get(e)
                if(!iCb) return;
                /* for each element of the container, update the container's dimensions within the element's intersection */
                const {i, cb} = iCb;
                const {x, y, width, height} = entry.contentRect
                i.scrollContainer = {x, y, width, height, center: getCenter(x, y, width, height)}
                cb(i)
                elIntersectionCallback.set(e, {i,cb})
            })

            return
        }
        const {i, cb} = iCb
        const { x, y, width, height } = entry.contentRect
        i.el = {x, y, width, height, center: getCenter(x, y, width, height)}
        cb(i)
        elIntersectionCallback.set(entry.target, {i, cb}) // todo: see if it isn't needed to set i, cb bc we are manipulating a reference to i. I am concerned that we are needlessly creating a new reference here when we can just re-use the same reference
       })
    })
    resizeObserverCount += 1
}
const unobserveResize = (el: HTMLElement) => {
    if(!resizeObserver) return;
    resizeObserver.unobserve(el)
    resizeObserverCount -= 1
    if (resizeObserverCount === 0) resizeObserver.disconnect();
}

/* add el to array of els to update on scroll, and if no scroll handler on container, add it */
const addScrollHandler = (el: HTMLElement, container: HTMLElement | null) => {

    const els = scrollObservedEls.get(container || document)
    scrollObservedEls.set(container || document, els ? [...els, el] : [el])
    
    observeResize(el); /* observeResize piggybacks off of the same data structures that are updated in addScrollHandler, so we run it here */
    
    if(scrollHandlers.has(container || document)) return;

    /* this one scroll handler takes care of every element that has scroll set to true */
    const handleScroll = () => {
        const els = scrollObservedEls.get(container || document)
        if(els) els.forEach(e => {
            const iCb = elIntersectionCallback.get(e)
            if(!iCb) return;
            const {i, cb} = iCb;
            
            (() => {
                const {x, y, width, height} = e.getBoundingClientRect()
                i.el = {
                    x, y, width, height, 
                    center: getCenter(x, y, width, height)
                }
            })();
            (() => {
                const {x, y, width, height} = container ? container.getBoundingClientRect() : (() => ({x: 0, y: 0, width: window.innerWidth, height: window.innerHeight}))()
                i.scrollContainer = {
                    x, y, width, height, 
                    center: getCenter(x, y, width, height)
                }
            })()

            elIntersectionCallback.set(e, {i, cb})
            cb(i)
            
        })
    }

    (container || document).addEventListener('scroll', handleScroll, {passive: true /* NEEDED for perf */})

    scrollHandlers.set(container || document, handleScroll) /* retrieve THIS function to unregister scroll handler. */
}

/* remove el from array of els to update, and if the remaining array is zero, remove the handler entirely */
const removeScrollHandler = (el: HTMLElement, container: HTMLElement | null) => {

    unobserveResize(el); /* unobserveResize piggybacks off of the same data structures that are updated in removeScrollHandler, so we run it here */

    const els = scrollObservedEls.get(container || document)
    if(!els || els.length === 1){ 
        scrollObservedEls.delete(container || document) /* if !els, this is a no-op */
        const handler = scrollHandlers.get(container || document)
        if(handler) (container || document).removeEventListener('scroll', handler); /* if removeScrollHandler is called on an el that never opted into scroll in the first place, and no other els of the container opted in, then handler will be undefined */
        scrollHandlers.delete(container || document)
    } else {
        scrollObservedEls.set(container || document, els.filter(e => e !== el))
    }
}

const disconnectIntersectionObserver = (observer: IntersectionObserver) => {
    const observed = intersectionObservedEls.get(observer)
    if(observed) intersectionObservedEls.delete(observer);
    observer.disconnect(); /* disconnecting doesn't actually remove the observer from the scrollContainer. Instead, it hangs around forever, waiting to be reinitialized. Why? I don't know. */
    return observed
}

const addIntersectionObserver = (el: HTMLElement, container: HTMLElement | null) => {
    const c = container || window
    let o = intersectionObservers.get(c)
    if (!o) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const iCb = elIntersectionCallback.get(entry.target)
                if (!iCb) return;
                
                const {i, cb} = iCb

                i.intersecting = entry.isIntersecting; /* the idea is that we only set the properties that are known to the specific event listener */

                if(!i.intersecting){
                    removeScrollHandler(el, container);
                    const els = scrollObservedNotIntersectingEls.get(container || document)
                    scrollObservedNotIntersectingEls.set(container || document, els ? [...els, el] : [el])
                } else {
                    let els = scrollObservedNotIntersectingEls.get(container || document);
                    if(!els) return;
                    if(els.includes(el)){
                        addScrollHandler(el, container);
                        els = els.filter(e => e !== el)
                        if(els.length === 0) return scrollObservedNotIntersectingEls.delete(container || document);
                        scrollObservedNotIntersectingEls.set(container || document, els)
                    }
                }

                elIntersectionCallback.set(entry.target, {i, cb})
                cb(i)
            })
        })
        intersectionObservers.set(c, observer)
        o = observer
    }

    let unobserve = elIntersectionUnobserve.get(el)
    if(unobserve) unobserve();
    unobserve = () => {
        if(o) {
            o.unobserve(el);
            elIntersectionCallback.delete(el)
            let els = intersectionObservedEls.get(o)
            if(els) {
                if (els.length === 1){
                    disconnectIntersectionObserver(o) // possibly redundant to disconnect intersection observer after the last el has been deleted, but w/e
                    return intersectionObservedEls.delete(o) /* because el is the last element in els */
                }
                intersectionObservedEls.set(o, els.filter(e => e !== el)); /* remove the unobserved el from the list of els observed by the intersection observer */
            } 
        }
    }
    elIntersectionUnobserve.set(el, unobserve)

    o.observe(el)
    let els = intersectionObservedEls.get(o)
    els = els ? [...els, el] : [el]
    intersectionObservedEls.set(o, els)
}

let onWindowResize: (() => void) | undefined = undefined

const addWindowResize = () => {

    const r = () => {
        const els = scrollObservedEls.get(document)
        if(els) els.forEach(e => {
            const iCb = elIntersectionCallback.get(e)
            if(!iCb) return;
            const {i, cb} = iCb
            i.scrollContainer = {
                x: 0,
                y: 0,
                width: window.innerWidth,
                height: window.innerHeight,
                center: {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2
                }
            }
            cb(i)
            elIntersectionCallback.set(e, {i, cb}) // todo: check if we can skip resetting, so that we don't have to put old refs on garbage heap
        });
    }
        
    if(onWindowResize || !scrollObservedEls.get(document) && !scrollObservedNotIntersectingEls.get(document)) return; /* only add resize listener if there are els that actually want to know when window has resized */
    
    window.addEventListener('resize', r, {passive: true /* NEEDED for perf */});
    onWindowResize = r
}

const removeWindowResize = () => {
    if(!onWindowResize || scrollObservedEls.get(document) || scrollObservedNotIntersectingEls.get(document)) return; /* only remove resize listener if there are NO els that want to know when window has resized */
    window.removeEventListener('resize', onWindowResize)
    onWindowResize = undefined
}

/**
 * intersectionPlugin provides the v-intersect and v-global-scroll-container directives. 
 * 
 * When the v-intersect directive is applied to an element, it watches the element for changes in intersection.
 * 
 * use v-intersect as follows:
 * 
 * ```vue
 * 
 * <template>
 *  <div v-intersect="{onIntersect, scrollContainer, scroll}">
 * </template>
 * 
 * <script setup lang="ts">
 * 
 *  import {ref, Ref} from 'vue'
 *  import { Intersection } from 'incremental.design
 *  
 *  const scroll = ref(true) // set to false if you only want onIntersect to run when <div...> changes from intersecting to not intersecting and vice versa
 * 
 *  const scrollContainer: Ref<HTMLElement | null> = ref(null) // if this is set to null, then v-intersect will watch the intersection between el and window, or el and v-global-scroll-container, if it is set. Otherwise, it will watch the intersection between el and the HTMLElement to which this is set.
 * 
 *  const onIntersect: (i: Intersection) => void = (i) => {
 *      const {intersecting, el, scrollContainer} = i
 *      // el and scrollContainer are either undefined or an object of type: { x: number, y: number, width: number, height: number, center: {x: number, y: number}}
 *      // do whatever you want on intersect
 *  }
 *  
 * </script>
 * ```
 * 
 * v-intersect receives an object with the following properties:
 * 
 *  - onIntersect - the function you want to run whenever v-intersect detects as change in intersection. This is a function that accepts an argument of type {@link Intersection}
 *  - scrollContainer - the element with which the current element intersects. If this is not set, then the current element will intersect with {@link Window}, or if v-global-scroll-container is set, then the element to which v-global-scroll-container is applied.
 *  - scroll - a {@link Ref} of type boolean. Set this to ref(true) to run onIntersect whenever the scrollContainer is scrolled AND the element is intersecting it. Omit this, or set it to false to only run onIntersect when the current element starts or stops intersecting with its scroll container.
 * 
 * v-global-scroll-container changes the default scroll container from {@link Window} to the HTMLElement to which it is applied. This means that any elements to which v-intersect is applied will observe the intersection between the element and the element to which v-global-scroll-container is applied.
 * 
 * use v-global-scroll-container as follows:
 * 
 * ```
 * <template>
 *  <div v-global-scroll-container>
 *      <!-- only apply v-intersect to components in here -->
 *  </div>
 * </template>
 * ```
 * 
 * v-global-scroll-container does not receive any object.
 */
const intersectionPlugin = {
    install(app: App /*, options */){
        app.directive('intersect'/* becomes 'v-intersect' */, {
            mounted(el, binding){

                const scroll = binding.value.scroll
                const scrollContainer = binding.value.scrollContainer || globalScrollContainer
                const onIntersect = binding.value.onIntersect || (() => {throw new Error("v-intersect: onIntersect must be defined, and must be a function")})()
                
                elIntersectionCallback.set(el, {
                    i: {intersecting: false},
                    cb: onIntersect
                })

                addIntersectionObserver(el, scrollContainer)
                if(scroll) addScrollHandler(el, scrollContainer);
                if(!scrollContainer) addWindowResize();
            },
            updated(el, binding){

                if (binding.value.onIntersect !== binding.oldValue.onIntersect) elIntersectionCallback.set(el, binding.value.onIntersect);

                if(binding.value.scroll != binding.oldValue.scroll) return binding.value.scroll ? addScrollHandler(el, binding.value.scrollContainer) : removeScrollHandler(el, binding.value.scrollContainer);

                if(binding.value.scroll && binding.value.scrollContainer != binding.oldValue.scrollContainer){
                    removeScrollHandler(el, binding.oldValue.scrollContainer);
                    addScrollHandler(el, binding.value.scrollContainer)
                }
                return binding.value.scrollContainer ? removeWindowResize() : addWindowResize()
                
            },
            unmounted(el, binding){
                const unobserve = elIntersectionUnobserve.get(el)
                if(unobserve) unobserve(); /* unobserve should ALWAYS be set */

                removeScrollHandler(el, binding.oldValue.container)
                if(binding.value.container !== binding.oldValue.container) removeScrollHandler(el, binding.value.container); /* in some cases, this call is redundant. However, removeScrollHandler is idempotent, so we can call it as many times as we want without creating nasty side effects. We do this just to be entirely sure that all possible scroll handlers are removed */
                removeWindowResize() // technically this call can be optimized by skipping it in cases where we know it will no-op
                
            }
        })
        /* if global-scroll-container changes, cleanup the intersection observer, and set up the new one. make sure all els that were being observed by the old intersection observer get observed by the new one */
        app.directive('global-scroll-container' /* becomes 'v-global-scroll-container' */, {
            mounted(el){
                removeWindowResize()
                globalScrollContainer = el /* this will ALWAYS be an HTMLElement because vue won't mount to window */
                observeResize(el);
                // todo: remove window event listener resize - how to make sure this only runs on client?
                
                const observer = intersectionObservers.get(window)
                
                if(observer){
                    let sEls = [...scrollObservedEls.get(document) || [], ...scrollObservedNotIntersectingEls.get(document) || []]
                    scrollObservedEls.delete(document)
                    scrollObservedNotIntersectingEls.delete(document)

                    const observed = disconnectIntersectionObserver(observer)
                    sEls.forEach(e => addScrollHandler(e, el)) // todo: double-check that if an e is part of the scrollObservedNotIntersectingEls list, then even though it's scroll handler is added in, it doesn't start tracking scroll until it is intersecting el
                    if(observed) observed.forEach(e => addIntersectionObserver(e, el));
                }
            },
            unmounted(el){
                unobserveResize(el);
                
                globalScrollContainer = null
                const observer = intersectionObservers.get(el)
                
                if(observer){
                    let sEls = [...scrollObservedEls.get(el) || [], ...scrollObservedNotIntersectingEls.get(el) || []]
                    scrollObservedEls.delete(el)
                    scrollObservedNotIntersectingEls.delete(el)
                    const observed = disconnectIntersectionObserver(observer)
                    sEls.forEach( e => addScrollHandler(e, null)) // todo: double-check that if an e is part of the scrollObservedNotIntersectingEls list, then even though it's scroll handler is added in, it doesn't start tracking scroll until it is intersecting el
                    if(observed) observed.forEach(e => addIntersectionObserver(e, null /* null becomes window */));
                }
                addWindowResize()
            }
        })
    }
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(intersectionPlugin)
})