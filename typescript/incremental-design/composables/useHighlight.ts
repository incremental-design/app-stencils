/**
 * 
 * @param el a [https://vuejs.org/api/reactivity-core.html#ref](Ref) of an [https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement](HTMLElement)
 * @param intervalMs  
 * @param startIndex 
 * @param endIndex 
 * @returns 
 */
export default function(el: Ref<HTMLElement | null>, intervalMs: number, startIndex: number, endIndex: number): Ref<number>{
    const i = useIntersect({el}); // todo: refactor once plugin is complete
    
    const pause = ref(true);
    const index = ref(startIndex);
    const interval = useInterval(intervalMs, pause, startIndex, endIndex);
    
    watchEffect(() => {
      if (!i.intersecting) {
        pause.value = true;
      } else {
        pause.value = index.value > endIndex;
      }
    });
    
    watchEffect(() => {
      interval.value;
      index.value = index.value + 1;
    });

    return index;

    // 1. register a scroll listener on the parent window for each element
    // 2. make more efficient by wrapping injectable and composable in a plugin (and maybe a directive??)
}

