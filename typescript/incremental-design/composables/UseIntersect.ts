export type IsIntersecting = {
    intersecting: boolean,
    el: {
        x: number
        y: number
        width: number
        height: number
        center: {
            x: number,
            y: number
        }
    }
    container: {
        x: number
        y: number
        width: number
        height: number
        center: { // todo: set this method on prototype to optimize memory usage?
            x: number,
            y: number,
        }
    }    
}

export type UseIntersect = (
    el: Ref<HTMLElement | null>,
    container?: Ref<HTMLElement | null>,
    scroll?: Ref<boolean>,
    ) =>  typeof scroll extends Ref<boolean> ? Ref<IsIntersecting> : Ref<boolean> /* read: if you DON'T supply scroll, you will only get a true/false back */

/**
 * Detect whether an element is intersecting a container, and optionally track its scroll position when it is intersecting
 * 
 * @param el - the element to observe
 * @param container - the container that the element intersects. Defaults to [Window](https://developer.mozilla.org/en-US/docs/Web/API/Window)
 * @param scroll - whether to track the position of el when it is intersecting. If set to [Ref](https://vuejs.org/api/reactivity-core.html#ref) with value of true, then the position is tracked and returned.
 * @returns a ref with value of true or false, if scroll is undefined. Otherwise, an object of type {@link IsIntersecting}
 * 
 * @remarks
 *
 * if scroll is set, then scroll position will be polled once per animation frame. This means that you should NOT throttle whatever animation you want to do on scroll, as this composable is already throttling it.
 *
 */
const u: UseIntersect = (el, container, scroll) => {

    // todo: use type guard on scroll ??

    /* detect intersect */
    
    const intersecting = ref(false);
    let iOb: IntersectionObserver
    onUnmounted(() => {
        if(iOb) iOb.disconnect()
    })

    if(!scroll){
        if(!container) {
            /* then just check if el is intersecting window */
    
            iOb = new IntersectionObserver(es => {
                intersecting.value = es[0].isIntersecting /* we can safely assume that es[0] is el, because we only ever observe el */
            }, {
                rootMargin: "100px" // todo: expose
            })
    
            const stop = watchImmediate(el, (value, oldValue) => {
                if(oldValue) iOb.unobserve(oldValue);
                if(value) iOb.observe(value);
            })
    
            onUnmounted(() => stop())
        } else {
            /* then check if container has changed, and check if el is intersecting container */
    
            const stop = watchImmediate([() => el.value, () => container.value], (value, oldValue) => {
               const [e, c] = value
               const [oE, oC] = oldValue ? oldValue : [undefined, undefined]
    
               if(c != oC){
                if(iOb) iOb.disconnect();
                if (c) {
                    iOb = new IntersectionObserver(es => {
                        intersecting.value = es[0].isIntersecting /* again, we can safely assume that es[0] is el, because we only ever observe el */
                    },
                    {
                        root: c,
                        rootMargin: "100px" // todo: expose
                    })
                    if(e) iOb.observe(e);
                }
                return
               }
               if(e != oE){
                if(!iOb) return;
                if(oE) iOb.unobserve(oE);
                if(e) iOb.observe(e)
               }
            })
    
            onUnmounted(() => stop())
        }
        
        return intersecting
    } else {
        /* track scroll and resize - this whole section is skipped if scroll is not provided */
        const isIntersecting: IsIntersecting = reactive({
            intersecting,
            ratio: 0,
            maxRatio: 0,
            el: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                /**
                 * center - get the centerpoint of the el that is being observed
                 */
                center: computed(() => {
                    return {
                        x: (isIntersecting.el.x + isIntersecting.el.width) / 2,
                        y: (isIntersecting.el.y + isIntersecting.el.height) / 2
                    }
                })
            },
            container: {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                /**
                 * center - get the centerpoint of the container
                 */
                center: computed(() => {
                    return {
                        x: (isIntersecting.container.x + isIntersecting.container.width) / 2,
                        y: (isIntersecting.container.y + isIntersecting.container.height) / 2
                    }
                })
                
            }
        })
        const updateIsIntersecting = (e: HTMLElement, c?: HTMLElement) => {
            (() => {
                const {width, height, x, y} = e.getBoundingClientRect()
                isIntersecting.el.width = width
                isIntersecting.el.height = height
                isIntersecting.el.x = x
                isIntersecting.el.y = y
            })()
            
            const {width, height, x, y} = c ? c.getBoundingClientRect() : {
                width: window.innerWidth,
                height: window.innerHeight,
                x: 0,
                y: 0
            }

            isIntersecting.container.width = width
            isIntersecting.container.height = height
            isIntersecting.container.x = x
            isIntersecting.container.y = y
        }

        let rOb: ResizeObserver
        let untrackScroll: (() => undefined) | undefined = undefined
        onUnmounted(() => {
            untrackScroll = untrackScroll ? untrackScroll() : undefined;
            if(rOb) rOb.disconnect();
        })

        if(!container){

            const stopWatchingEl = watchEffect(() => {
                /* we clear out resize observer and intersection observer any time anything changes, because we bake the container and element values into their callbacks */
                [iOb, rOb].forEach(o => o.disconnect())
                const e = el.value

                if(!e) return;

                iOb = new IntersectionObserver(es => {
                    intersecting.value = es[0].isIntersecting
                    updateIsIntersecting(e)
                })

                iOb.observe(e)

                rOb = new ResizeObserver(() => {
                    updateIsIntersecting(e)
                })

                rOb.observe(e)

            })

            const stopWatchingScroll = watchEffect(() => {
                untrackScroll = untrackScroll ? untrackScroll() : undefined

                const e = el.value
                const i = intersecting.value
                const s = scroll.value

                if ( !e || !i || !s) return

                const h = () => updateIsIntersecting(e)

                window.addEventListener('scroll', h, {passive: true})

                untrackScroll = () => {
                    window.removeEventListener('scroll', h)
                }
            })

            onUnmounted(() => {
                stopWatchingEl()
                stopWatchingScroll()
            })

            return ref(isIntersecting)
        } else {

            const stopWatchingElandContainer = watchEffect(() => {
                /* we clear out resize observer and intersection observer any time anything changes, because we bake the container and element values into their callbacks */
                [iOb, rOb].forEach(o => o.disconnect())

                const c = container.value
                const e = el.value

                if (!c || !e) return;

                iOb = new IntersectionObserver(es => {
                    intersecting.value = es[0].isIntersecting
                    updateIsIntersecting(e, c)
                },{
                    ...(() => c ? {root: c} : {})(),
                    rootMargin: "100px"
                })

                iOb.observe(e)

                rOb = new ResizeObserver(() => {
                    updateIsIntersecting(e, c)
                })
                
                rOb.observe(e)
                rOb.observe(c)

            })

            const stopWatchingScroll = watchEffect(() => {
                untrackScroll = untrackScroll ? untrackScroll() : undefined

                const c = container.value
                const e = el.value
                const i = intersecting.value
                const s = scroll.value

                if (!c || !e || !i || !s) return

                const h = () => updateIsIntersecting(e, c)

                c.addEventListener('scroll', h, {passive: true})

                untrackScroll = () => {
                    c.removeEventListener('scroll', h)
                }
            })

            onUnmounted(() => {
                stopWatchingElandContainer()
                stopWatchingScroll()
            })

        }
        return ref(isIntersecting) /* when you ref a reactive, changing the ref's .value.property is the same as directly changing the reactive's property */
    }
}

export default u


// todo: make an intersectionObserver plugin for vue. it should register an observeIntersectionInjectable on a root app, and should also make the `useIntersect` composable available throughout the vue app

// when using this composable in a PLUGIN:
// 1. if a container doesn't have an observer, create the observer. put the container, observer, and a count of observed objects in a map
// 2. if a container has an observer, retrieve the observer from the map, and put register the el. increment the count of observed objects
// 3. when an object is unmounted, decrement the count of observed objects. if count hits zero, disconnect the observer to clean up