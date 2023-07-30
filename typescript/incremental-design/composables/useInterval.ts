export default function(intervalMs: number): Ref<boolean>{

  let clear: () => void;
  
  const tickTock = ref(false)
  
  onMounted(() => {
    const id = setInterval(() => {
      tickTock.value != tickTock.value
    }, interval);
  
    clear = () => {
      clearInterval(id);
    };
  
  });
  
  onUnmounted(() => {
    clear();
  });

  return tickTock
}

