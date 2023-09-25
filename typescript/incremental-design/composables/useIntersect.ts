export interface Intersection {
    intersecting: boolean,
    el?: DOMElGeometry
    scrollContainer?: DOMElGeometry   
}

export interface DOMElGeometry {
    x: number
    y: number
    width: number
    height: number
    center: {
        x: number,
        y: number
    }
}

export type IntersectArgs = [el: HTMLElement | null, scroll: boolean, scrollContainer: HTMLElement | null]

/**
 * 
 * @param el - a {@link Ref} that contains the HTMLElement to track.
 * @param scroll - a {@link Ref} of type boolean
 * @param scrollContainer - a {@link Ref} that contains the HTMLElement that el intersects. If set to `null`, then this composable will track the intersection of el relative to {@link Window}
 * 
 * @returns a {@link Ref} that contains an {@link Intersection}
 *  - if `scroll` is set to ref(true), then {@link Intersection.el} and {@link Intersection.scrollContainer} will be of type {@link DOMElGeometry}. Otherwise, they will be of type `undefined`
 * 
 * @remarks
 *
 * if you only want to check if `el` is intersecting, set scroll to `ref(false)`. This won't tell you the {@link DOMElGeometry} of `el` and `scrollContainer` (or window, if `scrollContainer` is not supplied). It will also give you a performance boost.
 *
 * set `scrollContainer` to `ref(null)` if you want to track the intersection of `el` relative to {@link Window}. Otherwise, set it to the HTMLElement that contains `el`.
 */
export default function useIntersect(el: Ref<IntersectArgs[0]>, scroll: Ref<IntersectArgs[1]>, scrollContainer: Ref<IntersectArgs[2]>): Ref<Intersection> {

    const o: Intersection = reactive({
        intersecting: false,
        el: undefined,
        container: undefined
    })

    let iOb: IntersectionObserver
    let removePrevElFromIOb: () => void = () => {return};// just remove the prev HTMLElement
    let removeIOb: () => void = () => {return}; // completely disconnect the old iOb

    // note that there is no 'reuse' scroll, because scroll is just an event handler on the scroll container
    let removeScroll: () => void = () => {return}

    let rOb: ResizeObserver
    let removePrevContainerFromROb: () => void = () => {return}
    let removePrevElFromROb: () => void = () => {return}
    let removeROb: () => void = () => {return}

    let removeWindowResize: () => void = () => {return}

    watch([() => el.value, () => scroll.value, () => scrollContainer.value], (curr, prev) => {
        const [eC, sC, scC] = curr as IntersectArgs
        const [eP, sP, scP] = prev as IntersectArgs

        type handlers = [
            intersect: boolean, /* intersectionObserver on scC or window, observing eC */
            scroll: boolean, /* scroll event handler on scC or window */
            resize: boolean, /* resizeObserver on eC and scC if scC is not window */
            resizeWindow: boolean /* resize event handler on window */
        ]
        /* first we remove old handlers, if needed, then we add new handlers, if needed. In the case that a handler is not to be removed, but is to be added, we re-use the same handler with a new el */
        let remove: handlers = [false, false, false, false]; 
        let add: handlers = [false, false, false, false];
        /* the tricky bit here is that if remove[0] is set to false and add[0] is set to true, we WILL reuse the existing intersectionObserver */
        /* likewise, if remove[2] is set to false and add[2] is set to true, we WILL reuse the existing resizeObserver */

        (() => {
            /* el is null */
            if(!eC) {
                remove[0] = true; remove[1] = true;remove[2] = true; remove[3] = true; return; /* can't track an el that doesn't exist */
            }
            /* el is not null, and scroll container is window */
            if(!scC) add[3] = true; /* add a resize listener to scC if it is window. In cases where scC is always null, assume that scroll container is always window */
            /* el is not null, and scroll container has changed */
            if(scC != scP){
                remove[0] = true; remove[1] = true; add[0] = true; add[1] = true;
                if (scC) remove[3] = true; /* scC is not window */
            } 
            /* el is not null, and has changed */
            if(eC != eP){
                add[0] = true; add[1] = true; add[2] = true;
            }
            /* up until here, we have assumed that scroll and resize should be tracked. Now, if scroll and resize should NOT be tracked, remove all handlers except for intersectionObserver */
            if(!sC) {
                remove[1] = true; remove[2] = true; remove[3] = true; add[1] = false; add[2] = false; add[3] = false; return;
            }
        })()

        /* refresh intersection observer */
        if(remove[0]) removeIOb();

        const addIOb = () => {
            iOb = new IntersectionObserver((entries) => {
                o.intersecting = entries[0].isIntersecting /* only one entry will ever be added to iOb, so we can safely assume that it is el */
            }, {
                root: scC /* if null, root automatically gets set to window */,
                rootMargin: "100px" // todo: expose
            })

            iOb.observe(eC as HTMLElement)

            removePrevElFromIOb = () => iOb.unobserve(eC as HTMLElement) /* all this does is put eC into the closure scope so that it can be accessed in the next invocation of watch */

            removeIOb = () => {
                iOb.disconnect()
                removePrevElFromIOb = () => {return} /* set to no-op so no err on undefined */
                removeIOb = () => {return} /* set to no-op so no err on undefined */
            }
        }

        if(add[0]){
            if (remove[0] || !iOb /* we HAVE to put this line in here because the very first time that el is provided, there will NOT be an iOb */){
                addIOb();
            } else {
                removePrevElFromIOb(); /* unobserve the old el */
                iOb.observe(eC as HTMLElement)
                removePrevElFromIOb = () => iOb.unobserve(eC as HTMLElement)
            }
        }

        /* refresh scroll handlers */
        const getCenter = (x: number, y: number, width: number, height: number) => ({
            x: (x + width) / 2,
            y: (y + height) / 2
        })

        if(remove[1]) removeScroll();

        const addScroll = () => {

            const handleScroll = () => {


                /* don't waste time defining scroll container if it has already been defined, since it only changes on resize */
                if(!o.scrollContainer){
                    if(!scC){
                        o.scrollContainer = {
                            x: 0,
                            y: 0,
                            width: window.innerWidth,
                            height: window.innerHeight,
                            center: {
                                x: window.innerWidth / 2,
                                y: window.innerHeight / 2
                            }
                        }
                    } else {
                        const {x, y, width, height} = scC.getBoundingClientRect()
                        o.scrollContainer = {
                            x, y, width, height,
                            center: getCenter(x, y, width, height)
                        }
                    }
                }
                const {x, y, width, height} = (eC as HTMLElement).getBoundingClientRect()
                o.el = {
                    x, y, width, height,
                    center: getCenter(x, y, width, height)
                }
            }

            const c = scC || document;
            c.addEventListener('scroll', handleScroll, {
                passive: true /* NEEDED for perf */
            })

            removeScroll = () => {
                c.removeEventListener('scroll', handleScroll)
            }

        }
        if(add[1]) addScroll();

        /* refresh resize observers */
        if(remove[2]) removeROb()

        const addROb = () => {
            rOb = new ResizeObserver((entries) => {
                entries.forEach(entry => {
                    const {contentRect, target} = entry
                    const {x, y, width, height} = contentRect
                    const geometry = {
                        x, y, width, height,
                        center: getCenter(x, y, width, height)
                    }
                    if(target === eC){
                        o.el = geometry
                    }
                    /* if you set eC and scrollContainer to the same element, both will get set here. So, don't do that! */
                    if(target === scC){
                        o.scrollContainer = geometry
                    }
                })
            })
            removeROb = () => {
                rOb.disconnect()
                removePrevContainerFromROb = () => {return}
                removePrevElFromROb = () => {return}
                removeROb = () => {return}
            }
        }

        if(add[2]){
            if(remove[2] || !rOb /* we have to put this in here because the very first time el is provided, there will not be an rOb */){
                addROb();
            } 
            if(eC != eP){
                removePrevElFromROb()
                rOb.observe(eC as HTMLElement, 
                    /* unfortunately, because of safari, we cannot use 'device-pixel-content-box' */
                    // { box: 'device-pixel-content-box' /* this makes sure that CSS transforms are ignored (important for making sure this doesn't infinitely loop when css transforms are applied on parallax) */}
                );
                removePrevElFromROb = () => rOb.unobserve(eC as HTMLElement)
            }
            if(scC != scP){
                if(!scC){ /* we don't use resize observer on window */
                    removePrevContainerFromROb();
                    removePrevContainerFromROb = () => {return}
                } else {
                    
                    rOb.observe(scC,
                        /* unfortunately, because of safari, we cannot use 'device-pixel-content-box' */
                        // {box: 'device-pixel-content-box' /* this makes sure that CSS transforms are ignored (important for making sure this doesn't infinitely loop when css transforms are applied on parallax) */}
                    )
                    removePrevContainerFromROb = () => rOb.unobserve(scC)
                }

            }
        }
        /* finally, observe resize of window */
        if(remove[3]) removeWindowResize();

        const addWindowResize = () => {
            const onResize = () => {
                o.scrollContainer = {
                    x: 0,
                    y: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                    center: {
                        x: window.innerWidth / 2,
                        y: window.innerHeight / 2
                    }
                }
            }

            window.addEventListener('resize', onResize, {
                passive: true /* NEEDED for perf */
            })

            removeWindowResize = () => {
                window.removeEventListener('resize', onResize)
            }
        }

        if(add[3]) addWindowResize();

    })

    return ref(o)

}