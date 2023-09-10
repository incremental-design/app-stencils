/**
 * 
 * @param intervalMs the number of milliseconds between increments
 * @param pause whether to pause incrementing
 * @param start the integer from which to increment.
 * @param end the integer at which to stop incrementing. If end is not provided, this composable will increment indefinitely. If end is less than start, this composable will DECREMENT instead of increment
 * @returns a [ref](https://vuejs.org/api/reactivity-core.html#ref) to a number between `start` and `end` 
 * 
 * @remarks you MUST supply an integer for start. If you supply a number for end, it must also be an integer
 */

export default function(intervalMs: number, pause: Ref<boolean>, start: number, end?: number ): Ref<number>{

  const increment: boolean = end ? start < end : true

  let clear: () => void;

  const i = ref(start)
  
  onMounted(() => {
    const id = setInterval(() => {
      if (pause.value || i.value == end) return;
      i.value = i.value + (increment ? 1 : -1)
    }, intervalMs);
  
    clear = () => {
      clearInterval(id);
    };
  
  });
  
  onUnmounted(() => {
    clear();
  });

  return i
}

