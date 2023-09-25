<template>
  <canvas ref="cv" width="500" height="500" alt="test rive" />
</template>

<script setup lang="ts">
import rive from "@rive-app/canvas";
const cv: Ref<HTMLElement | null> = ref(null);

let unmount = () => {
  return;
};

onMounted(() => {
  const r = new rive.Rive({
    src: "~/assets/isle2.riv",
    canvas: cv.value as HTMLCanvasElement,
    autoplay: true,
    stateMachines: "State Machine 1",
    onLoad: () => {
      r.resizeDrawingSurfaceToCanvas();
    },
  });
  unmount = () => r.cleanup();
});

onUnmounted(() => {
  unmount();
});
</script>

<style module="test" lang="postcss"></style>
