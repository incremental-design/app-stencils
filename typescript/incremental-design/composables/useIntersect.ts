export type Intersection = {
    intersecting: boolean,
    el?: {
        x: number
        y: number
        width: number
        height: number
        center: {
            x: number,
            y: number
        }
    }
    container?: {
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

type shared = [el: Ref<HTMLElement | null>, container ?: Ref<HTMLElement | null>]

function useIntersectWithoutScroll(el: shared[0], container: shared[1]):Intersection {
    /* detect intersect */
    const isIntersecting = reactive({
        intersecting: false
    })

    if (typeof window === "undefined") return isIntersecting; /* don't run in SSR */

    let iOb: IntersectionObserver

    onUnmounted(() => {
        if(iOb) iOb.disconnect()
    })
    
    if(!container) {
        /* then just check if el is intersecting window */

        iOb = new IntersectionObserver(es => {
            isIntersecting.intersecting = es[0].isIntersecting /* we can safely assume that es[0] is el, because we only ever observe el */
        }, {
            rootMargin: "100px" // todo: expose
        })

        watchImmediate(el, (value, oldValue) => {
            if(oldValue) iOb.unobserve(oldValue);
            if(value) iOb.observe(value);
        })

    } else {
        /* then check if container has changed, and check if el is intersecting container */

        watchImmediate([() => el.value, () => container.value], (value, oldValue) => {
            const [e, c] = value
            const [oE, oC] = oldValue ? oldValue : [undefined, undefined]

            if(c != oC){
            if(iOb) iOb.disconnect();
            if (c) {
                iOb = new IntersectionObserver(es => {
                    isIntersecting.intersecting = es[0].isIntersecting /* again, we can safely assume that es[0] is el, because we only ever observe el */
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
    }
    
    return isIntersecting
}

function useIntersectWithScroll(el: shared[0], container: shared[1], scroll: Ref<boolean>):Required<Intersection>{

    const isIntersecting: Required<Intersection> = reactive({
        intersecting: false,
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
    if (typeof window === "undefined") return isIntersecting; /* don't run in SSR */

    let iOb: IntersectionObserver
    onUnmounted(() => {
        if(iOb) iOb.disconnect()
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

        watchEffect(() => {
            /* we clear out resize observer and intersection observer any time anything changes, because we bake the container and element values into their callbacks */
            [iOb, rOb].forEach(o => {
                if(o) o.disconnect;
            })
            const e = el.value

            if(!e) return;

            iOb = new IntersectionObserver(es => {
                isIntersecting.intersecting = es[0].isIntersecting
                updateIsIntersecting(e)
            })

            iOb.observe(e)

            rOb = new ResizeObserver(() => {
                updateIsIntersecting(e)
            })

            rOb.observe(e)

        })

        watchEffect(() => {
            untrackScroll = untrackScroll ? untrackScroll() : undefined

            const e = el.value
            const i = isIntersecting.intersecting
            const s = scroll.value

            if ( !e || !i || !s) return

            const h = () => updateIsIntersecting(e)

            window.addEventListener('scroll', h, {passive: true})

            untrackScroll = () => {
                window.removeEventListener('scroll', h)
            }
        })
    } else {

        watchEffect(() => {
            /* we clear out resize observer and intersection observer any time anything changes, because we bake the container and element values into their callbacks */
            [iOb, rOb].forEach(o => {
                if(o) o.disconnect;
            })

            const c = container.value
            const e = el.value

            if (!c || !e) return;

            iOb = new IntersectionObserver(es => {
                isIntersecting.intersecting = es[0].isIntersecting
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

        watchEffect(() => {
            untrackScroll = untrackScroll ? untrackScroll() : undefined

            const c = container.value
            const e = el.value
            const i = isIntersecting.intersecting
            const s = scroll.value

            if (!c || !e || !i || !s) return

            const h = () => updateIsIntersecting(e, c)

            c.addEventListener('scroll', h, {passive: true})

            untrackScroll = () => {
                c.removeEventListener('scroll', h)
            }
        })
    }

    return isIntersecting

}

/**
 * Detect whether an element is intersecting a container, and optionally track its scroll position when it is intersecting
 * 
 * @param el - the element to observe
 * @param container - the container that the element intersects. Defaults to [Window](https://developer.mozilla.org/en-US/docs/Web/API/Window)
 * @param scroll - whether to track the position of el when it is intersecting. If set to [Ref](https://vuejs.org/api/reactivity-core.html#ref) with value of true, then the position is tracked and returned.
 * @returns a {@link Intersection}. If 
 * 
 * @remarks
 *
 * if scroll is set, then scroll position will be polled once per animation frame. This means that you should NOT throttle whatever animation you want to do on scroll, as this composable is already throttling it.
 *
 */
function useIntersect(p: {
    el: shared[0]
    container?: shared[1],
    scroll?: Ref<boolean>
}): Intersection{
    return typeof p.scroll === "undefined" ? useIntersectWithoutScroll(p.el, p.container) : useIntersectWithScroll(p.el, p.container, p.scroll)
}

export default useIntersect