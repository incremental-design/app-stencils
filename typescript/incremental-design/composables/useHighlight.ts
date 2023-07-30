export default function(el: Ref<HTMLElement | null>, intervalMs: number, startIndex: number, endIndex: number): Ref<number>{
    const intersecting = useIntersect(el);
    
    const pause = ref(true);
    const index = ref(startIndex);
    const interval = useInterval(intervalMs, pause);
    
    watchEffect(() => {
      if (!intersecting.value) {
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
}

