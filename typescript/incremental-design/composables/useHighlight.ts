/**
 * 
 * @param el a [https://vuejs.org/api/reactivity-core.html#ref](Ref) of an [https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement](HTMLElement)
 * @param intervalMs  
 * @param startIndex 
 * @param endIndex 
 * @returns 
 */
export default function(pause: Ref<boolean>, intervalMs: number, startIndex: number, endIndex: number): Ref<number>{
    
    const index = ref(startIndex);
    const interval = useInterval(intervalMs, pause, startIndex, endIndex);
    
    watchEffect(() => {
      if(interval.value >= endIndex - 1) pause.value = true;
      index.value = index.value + 1;

    });

    return index;
}

