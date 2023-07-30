export default function(intervalMs: number, pause: Ref<boolean>): Ref<boolean>{

  let clear: () => void;
  
  const tickTock = ref(false)
  
  onMounted(() => {
    const id = setInterval(() => {
      if (pause.value) return;
      tickTock.value = !tickTock.value
    }, intervalMs);
  
    clear = () => {
      clearInterval(id);
    };
  
  });
  
  onUnmounted(() => {
    clear();
  });

  return tickTock
}

